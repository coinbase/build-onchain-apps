import {getChainById} from '../../../src/utils/chainConfiguration';
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
    const chainId = req.query.chainId as string;
    if (!chainId) {
      return res.status(400).json({ error: 'chainid is required' });
    }
    const chain = getChainById(chainId);
    if (!chain) {
      return res.status(400).json({ error: 'chain not supported' });
    }
    const provider = getRpcProviderForChain(chain);
    const block = await provider.getBlockNumber();
    return res.status(200).json({ block: block.toString() });
  } catch (error) {
    console.error('Error fetching chains:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
