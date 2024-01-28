/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HubRpcClient, Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import { NextRequest, NextResponse } from 'next/server';

const HUB_URL = 'nemes.farcaster.xyz:2283';

function getHubClient(): HubRpcClient {
  return getSSLHubRpcClient(HUB_URL);
}

async function getFrameValidatedMessage(body: {
  trustedData?: { messageBytes?: string };
}): Promise<Message | undefined> {
  // Get the message from the request body
  const frameMessage: Message = Message.decode(
    Buffer.from(body?.trustedData?.messageBytes ?? '', 'hex'),
  );
  // Validate the message
  const client = getHubClient();
  const result = await client.validateMessage(frameMessage);
  if (result.isOk() && result.value.valid && result.value.message) {
    return result.value.message;
  }
  return;
}

type FidResponse = {
  verifications: string[];
};

async function getFrameAccountAddress(
  body: { trustedData?: { messageBytes?: string } },
  { NEYNAR_API_KEY = 'NEYNAR_API_DOCS' },
): Promise<string | undefined> {
  const validatedMessage = await getFrameValidatedMessage(body);
  if (!validatedMessage) {
    return;
  }
  // Get the Farcaster ID from the message
  const farcasterID = validatedMessage?.data?.fid ?? 0;
  // Get the user verifications from the Farcaster Indexer
  const options = {
    method: 'GET',
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${farcasterID}`,
    headers: { accept: 'application/json', api_key: NEYNAR_API_KEY },
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
  return;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
async function getResponse(req: NextRequest): Promise<NextResponse> {
  let signer: string | undefined = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    signer = await getFrameAccountAddress(body, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>BOAT</title>
        <meta name="fc:frame" content="vNext">
        <meta name="fc:frame:image" content="https://build-onchain-apps.vercel.app/release/v-0-16.png">
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
