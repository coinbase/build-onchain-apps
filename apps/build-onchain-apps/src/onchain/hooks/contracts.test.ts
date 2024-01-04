import { renderHook } from '@testing-library/react';
import { baseGoerli } from 'viem/chains';
import { useNetwork } from 'wagmi';
import BuyMeACoffeeABI from '../../contract/BuyMeACoffee';
import { generateContractHook } from './contracts';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useNetwork: jest.fn(() => ({ chain: undefined })),
}));

const mockUseNetwork = useNetwork as jest.MockedFunction<typeof useNetwork>;

const useTestContract = generateContractHook({
  abi: BuyMeACoffeeABI,
  [baseGoerli.id]: {
    chain: baseGoerli,
    address: '0xbasegoerli',
  },
});

describe('generated contract hook', () => {
  beforeEach(() => {
    mockUseNetwork.mockReset();
  });
  it('handles when not connected', () => {
    const {
      result: { current },
    } = renderHook(() => useTestContract());
    expect(current.status).toBe('notConnected');
    expect(current.abi).toEqual(BuyMeACoffeeABI);
  });
});
