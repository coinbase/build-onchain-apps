import { NextRequest, NextResponse } from 'next/server';

const rpcUrl = process.env.NEXT_PRIVATE_RPC_URL;

export async function POST(req: NextRequest) {
  if (rpcUrl === undefined) {
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }

  // forward to Coinbase Developer Platform RPC
  return fetch(rpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then(async (response) => {
      // Return the response data to the client
      return NextResponse.json(await response.json(), {
        status: response.status,
        statusText: response.statusText,
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    });
}
