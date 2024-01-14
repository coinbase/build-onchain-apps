import { getChainsForEnvironment } from '../../../src/store/supportedChains';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler for the /api/chains/supported route, this route will return all the supported
 * chains for this application.
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const chains = getChainsForEnvironment();
    res.status(200).json(chains);
  } catch (error) {
    console.error('Error fetching chains:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
