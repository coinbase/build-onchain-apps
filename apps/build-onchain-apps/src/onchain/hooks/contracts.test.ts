/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { baseGoerli, baseSepolia } from 'viem/chains';
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
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xbasesepolia',
    deactivated: true,
  },
});

describe('generated contract hook', () => {
  beforeEach(() => {
    mockUseNetwork.mockClear();
  });
  it.each([
    ['notConnected', undefined, undefined],
    ['onUnsupportedNetwork', { id: 31337 }, undefined],
    ['deactivated', { id: baseSepolia.id }, undefined],
    ['ready', { id: baseGoerli.id }, '0xbasegoerli'],
  ])('handles %s state', (state, chain, address) => {
    mockUseNetwork.mockImplementation(() => ({ chain: chain }) as ReturnType<typeof useNetwork>);
    const {
      result: { current },
    } = renderHook(() => useTestContract());
    expect(current.status).toBe(state);
    expect(current.abi).toEqual(BuyMeACoffeeABI);
    expect(current.supportedChains).toEqual([baseGoerli, baseSepolia]);
    if (address) {
      expect(current).toEqual(expect.objectContaining({ address }));
    } else {
      expect(current).not.toHaveProperty('address');
    }
  });
});
