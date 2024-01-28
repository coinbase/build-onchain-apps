import { HubRpcClient, Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
 
type FidResponse = {
  verifications: string[];
};

async function getFrameAccountAddress(body: { trustedData?: { messageBytes?: string } }) {
  // URL of the Hub
  const HUB_URL = 'nemes.farcaster.xyz:2283';
  // Create a Hub RPC client
  const client: HubRpcClient = getSSLHubRpcClient(HUB_URL);
  let farcasterID = 0;
  let validatedMessage: Message | undefined = undefined;
  // Get the message from the request body
  const frameMessage: Message = Message.decode(
    Buffer.from(body?.trustedData?.messageBytes ?? '', 'hex'),
  );
  // Validate the message
  const result = await client.validateMessage(frameMessage);
  if (result.isOk() && result.value.valid && result.value.message) {
    validatedMessage = result.value.message;
  }
  // Get the Farcaster ID from the message
  farcasterID = validatedMessage?.data?.fid ?? 0;
  // Get the user verifications from the Farcaster Indexer
  const options = {
    method: 'GET',
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${farcasterID}`,
    headers: { accept: 'application/json', api_key: 'NEYNAR_API_DOCS' },
  };
  const resp = await fetch(options.url, { headers: options.headers });
  const responseBody = await resp.json();
  // Get the user verifications from the response
  if (responseBody.users) {
    const userVerifications = responseBody.users[0] as FidResponse;
    if (userVerifications.verifications) {
      return userVerifications.verifications[0];
    }
  }
  return '0x00';
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let signer = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    signer = await getFrameAccountAddress(body);
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>BOAT</title>
        <meta name="fc:frame" content="vNext">
        <meta name="fc:frame:image" content="https://build-onchain-apps.vercel.app/release/v-0-17.png">
        <meta name="fc:frame:post_url" content="post_url_test">
        <meta name="fc:frame:button:1" content="${signer}">
      </head>
      <body>
        <p>BOAT Text</p>
      </body>
    </html>
  `);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
