import { isValidAAEntrypoint, isWalletACoinbaseSmartWallet } from '@coinbase/onchainkit/wallet';
import { NextRequest } from 'next/server';
import { paymasterClient } from '@/utils/paymasterClient';
import { POST } from './route';

jest.mock('@coinbase/onchainkit/wallet', () => ({
  isValidAAEntrypoint: jest.fn(),
  isWalletASmartWallet: jest.fn(),
}));
jest.mock('../../../src/utils/paymasterClient');

describe('POST function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and the result on success for pm_getPaymasterStubData', async () => {
    (isValidAAEntrypoint as jest.Mock).mockReturnValue(true);
    (isWalletACoinbaseSmartWallet as jest.Mock).mockResolvedValue(true);
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
    (isValidAAEntrypoint as jest.Mock).mockReturnValue(true);
    (isWalletACoinbaseSmartWallet as jest.Mock).mockResolvedValue(true);
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
  it('should return 400 and error message if isValidAAEntrypoint returns false', async () => {
    (isValidAAEntrypoint as jest.Mock).mockReturnValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'someMethod',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(json.error).toBe('invalid entrypoint');
  });
  it('should return 400 and error message if isWalletASmartWallet returns false', async () => {
    (isValidAAEntrypoint as jest.Mock).mockReturnValue(true);
    (isWalletACoinbaseSmartWallet as jest.Mock).mockResolvedValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        method: 'someMethod',
        params: [{}, 'entrypoint', '1'],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(json.error).toBe('invalid wallet');
  });
});
