import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentEnvironment } from '../../../src/store/environment';
import { getChainsForEnvironment } from '../../../src/store/supportedChains';
import handler from './supported';

jest.mock('../../../src/store/environment', () => ({
  getCurrentEnvironment: jest.fn(),
}));

jest.mock('../../../src/store/supportedChains', () => ({
  getChainsForEnvironment: jest.fn(),
}));

describe('/api/yourApiEndpoint handler', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let mockStatus: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockStatus = jest.fn();
    mockJson = jest.fn();
    req = {};
    res = {
      status: mockStatus.mockReturnThis(),
      json: mockJson.mockReturnThis(),
    };
  });

  it('returns chains for current environment', async () => {
    (getCurrentEnvironment as jest.Mock).mockReturnValue('development');
    (getChainsForEnvironment as jest.Mock).mockReturnValue(['chain1', 'chain2']);

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(['chain1', 'chain2']);
  });

  it('handles errors gracefully', async () => {
    (getChainsForEnvironment as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
