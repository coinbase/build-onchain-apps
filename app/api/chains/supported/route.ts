import { NextResponse } from 'next/server';
import { getChainsForEnvironment } from '@/store/supportedChains';

/**
 * Handler for the /api/chains/supported route, this route will return all the supported
 * chains for this application.
 * @param req
 * @param res
 */
export async function GET(): Promise<Response> {
  try {
    const chains = getChainsForEnvironment();
    return NextResponse.json(chains, { status: 200 });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
