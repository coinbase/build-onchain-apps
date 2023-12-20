import { Chain } from 'viem/chains';
import { getChainsForEnvironment } from '../../../src/utils/chainConfiguration';
import { getRpcProviderForChain } from '../../../src/utils/provider';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler for the /api/chain/blockNumber route, this route will return the current block number
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the Chain Id from the request
    const chainId = req.query.chainId;
    if (!chainId) {
      return res.status(400).json({ error: 'chainid is required' });
    }

    // Check if the chain is supported
    const chains = getChainsForEnvironment();
    const filteredChains = chains?.filter((c: Chain) => c.id === Number(chainId));
    if (!filteredChains?.length) {
      return res.status(400).json({ error: 'chainid not supported' });
    }
    const chain = filteredChains[0];
    const provider = getRpcProviderForChain(chain);
    const block = await provider.getBlockNumber();
    return res.status(200).json({ block: block.toString() });
  } catch (error) {
    console.error('Error fetching chains:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
