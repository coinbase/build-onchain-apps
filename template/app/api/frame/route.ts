import {
  FrameRequest,
  getFrameAccountAddress,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);
  if (isValid) {
    try {
      accountAddress = await getFrameAccountAddress(message, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
    } catch (err) {
      console.error(err);
    }
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `🌊 ${accountAddress} ⛵️`,
        },
      ],
      image: 'https://build-onchain-apps.vercel.app/release/v-0-17.png',
      post_url: 'post_url_test',
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
