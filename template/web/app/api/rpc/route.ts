import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (rpcUrl === undefined) {
      return res.status(500).json({ message: 'RPC URL is not defined' });
  }

  // forward to Coinbase Developer Platform RPC
  if (req.method === 'POST') {
    try {
      // Forward the content to another URL
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // Forward the request body
      });

      // Get the response data from the forwarded request
      const responseData = await response.text();

      // Return the response data to the client
      return NextResponse.json(responseData, { status: response.status, statusText: response.statusText });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    }
  } else {
    return NextResponse.json({}, { status: 405, statusText: 'Method Not Allowed' });
  }
}