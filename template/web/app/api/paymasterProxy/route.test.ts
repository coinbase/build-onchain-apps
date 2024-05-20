import { NextRequest } from 'next/server';
import { paymasterClient } from '../../../../web/src/components/SmartWallets/PaymasterClient';
import { willSponsor } from '../../paymaster-bundler/utils/willSponsor';
import { POST } from './route';

// Mocking dependencies
jest.mock('../../paymaster-bundler/utils/willSponsor');
jest.mock('../../../../web/src/components/SmartWallets/PaymasterClient');

describe('POST function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 400 if the operation is not sponsorable', async () => {
    (willSponsor as jest.Mock).mockResolvedValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'pm_getPaymasterStubData',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(json.error).toBe('Not a sponsorable operation');
  });

  it('should return 404 if the method is not found', async () => {
    (willSponsor as jest.Mock).mockResolvedValue(true);

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'unknown_method',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(404);
    expect(json.error).toBe('Method not found');
  });

  it('should return 200 and the result on success for pm_getPaymasterStubData', async () => {
    (willSponsor as jest.Mock).mockResolvedValue(true);
    (paymasterClient.getPaymasterStubData as jest.Mock).mockResolvedValue('stub data result');

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'pm_getPaymasterStubData',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { result: string };

    expect(response.status).toBe(200);
    expect(json.result).toBe('stub data result');
  });

  it('should return 200 and the result on success for pm_getPaymasterData', async () => {
    (willSponsor as jest.Mock).mockResolvedValue(true);
    (paymasterClient.getPaymasterData as jest.Mock).mockResolvedValue('paymaster data result');

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'pm_getPaymasterData',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { result: string };

    expect(response.status).toBe(200);
    expect(json.result).toBe('paymaster data result');
  });
});
