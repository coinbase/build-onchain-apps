import { baseSepolia } from 'viem/chains';
import { getChainById, getChainsForEnvironment } from '../../../src/utils/chainConfiguration';
import { getRpcProviderForChain } from '../../../src/utils/provider';
import handler from './currentBlockNumber';
import type { NextApiRequest, NextApiResponse } from 'next';

jest.mock('../../../src/utils/chainConfiguration');
jest.mock('../../../src/utils/provider');

describe('/api/chain/blockNumber', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let mockProvider: { getBlockNumber: jest.Mock };
  const unknownChainId = '73264023';
  const getChainsMock = getChainsForEnvironment as jest.Mock;
  const getChainByIdMock = getChainById as jest.Mock;

  beforeEach(() => {
    req = { query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockProvider = { getBlockNumber: jest.fn() };
    (getRpcProviderForChain as jest.Mock).mockReturnValue(mockProvider);
  });

  it('returns 400 if chainId is missing', async () => {
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'chainid is required' });
  });

  it('returns 400 if chainId is not supported', async () => {
    getChainsMock.mockReturnValue([]);
    if (!req.query) {
      req.query = {};
    }
    req.query = { chainId: unknownChainId };
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'chain not supported' });
  });

  it('returns 200 with block number on valid chainId', async () => {
    const mockBlockNumber = 123456;
    getChainByIdMock.mockReturnValue([{ id: baseSepolia.id }]);
    mockProvider.getBlockNumber.mockResolvedValue(mockBlockNumber);
    req.query = { chainId: baseSepolia.id.toString() };
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ block: mockBlockNumber.toString() });
  });

  it('returns 500 on internal server error', async () => {
    getChainByIdMock.mockImplementation(() => {
      throw new Error('Test error');
    });
    req.query = { chainId: unknownChainId };
    await handler(req as NextApiRequest, res as NextApiResponse);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
