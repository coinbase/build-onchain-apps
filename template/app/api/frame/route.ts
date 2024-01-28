import { HubRpcClient, Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const HUB_URL = 'nemes.farcaster.xyz:2283'; // URL of the Hub

const client: HubRpcClient = getSSLHubRpcClient(HUB_URL);

type FidResponse = {
  verifications: string[];
};

async function getAddrByFid(fid: number) {
  const options = {
    method: 'GET',
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    headers: { accept: 'application/json', api_key: 'NEYNAR_API_DOCS' },
  };
  const resp = await fetch(options.url, { headers: options.headers });
  const responseBody = await resp.json(); // Parse the response body as JSON
  if (responseBody.users) {
    const userVerifications = responseBody.users[0] as FidResponse;
    if (userVerifications.verifications) {
      return userVerifications.verifications[0];
    }
  }
  return '0x00';
}

async function getFrameMessage(req: NextRequest): Promise<Message> {
  const body: { trustedData?: { messageBytes?: string } } = await req.json();
  const frameMessage: Message = Message.decode(
    Buffer.from(body?.trustedData?.messageBytes ?? '', 'hex'),
  );
  return frameMessage;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let validatedMessage: Message | undefined = undefined;
  let signer = '';
  let fid = 0;
  try {
    const frameMessage: Message = await getFrameMessage(req);
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid && result.value.message) {
      validatedMessage = result.value.message;
    }
    fid = validatedMessage?.data?.fid ?? 0;
    signer = await getAddrByFid(fid);
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
