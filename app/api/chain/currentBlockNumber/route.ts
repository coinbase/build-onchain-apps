import { NextRequest, NextResponse } from 'next/server';
import { getChainById } from '@/store/supportedChains';
import { getRpcProviderForChain } from '@/utils/provider';

/**
 * Handler for the /api/chain/blockNumber route, this route will return the current block number
 * @param req
 * @param res
 */
export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Get the Chain Id from the request
    const chainId = req.nextUrl.searchParams.get('chainId');
    if (!chainId) {
      return NextResponse.json({ error: 'chainid is required' }, { status: 400 });
    }
    const chain = getChainById(chainId);
    if (!chain) {
      return NextResponse.json({ error: 'chain not supported' }, { status: 400 });
    }
    const provider = getRpcProviderForChain(chain);
    const block = await provider.getBlockNumber();
    return NextResponse.json({ block: block.toString() }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chains:', error);
    return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
  }
}

export const dynamic = 'force-dynamic';
