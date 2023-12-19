import { NextApiRequest, NextApiResponse } from 'next';
import { getChainsForEnvironment } from '../../../src/utils/chainConfiguration';
import { getCurrentEnvironment } from '../../../src/utils/configuration';
import handler from './supported';

jest.mock('../../../src/utils/chainConfiguration', () => ({
  getChainsForEnvironment: jest.fn(),
}));

jest.mock('../../../src/utils/configuration', () => ({
  getCurrentEnvironment: jest.fn(),
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
