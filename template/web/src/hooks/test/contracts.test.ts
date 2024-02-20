/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { generateContractHook } from '../contracts';
import MockABI from './MockABI';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useAccount: jest.fn(() => ({ chain: undefined })),
}));

const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

const useTestContract = generateContractHook({
  abi: MockABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xbaseSepolia',
  },
});

describe('contracts', () => {
  describe('generateContractHook', () => {
    beforeEach(() => {
      mockUseAccount.mockClear();
    });

    it.each([
      ['notConnected', undefined, undefined, undefined],
      ['notConnected', undefined, '0xbaseSepolia', undefined],
      ['notConnected', { id: 31337 }, undefined, undefined],
      ['onUnsupportedNetwork', { id: 31337 }, undefined, '0x123'],
      ['ready', { id: baseSepolia.id }, '0xbaseSepolia', '0x123'],
    ])('handles %s state', (state, chain, address, userAccount) => {
      mockUseAccount.mockImplementation(
        () => ({ chain: chain, isConnected: !!userAccount }) as ReturnType<typeof useAccount>,
      );
      const {
        result: { current },
      } = renderHook(() => useTestContract());
      expect(current.status).toBe(state);
      expect(current.abi).toEqual(MockABI);
      expect(current.supportedChains).toEqual([baseSepolia]);
      if (address && !!userAccount) {
        expect(current).toEqual(expect.objectContaining({ address }));
      } else {
        expect(current).not.toHaveProperty('address');
      }
    });
  });
});
