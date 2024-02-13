/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import BuyMeACoffeeABI from '../contract/BuyMeACoffee';
import Custom1155ABI from '../contract/Custom1155';
import SignatureMint721ABI from '../contract/SignatureMint721';
import {
  generateContractHook,
  useBuyMeACoffeeContract,
  useCustom1155Contract,
  useSignatureMint721,
} from './contracts';

jest.mock('wagmi', () => ({
  ...jest.requireActual<typeof import('wagmi')>('wagmi'),
  useAccount: jest.fn(() => ({ chain: undefined })),
}));

const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>;

const useTestContract = generateContractHook({
  abi: BuyMeACoffeeABI,
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
      expect(current.abi).toEqual(BuyMeACoffeeABI);
      expect(current.supportedChains).toEqual([baseSepolia]);
      if (address && !!userAccount) {
        expect(current).toEqual(expect.objectContaining({ address }));
      } else {
        expect(current).not.toHaveProperty('address');
      }
    });
  });

  describe('useBuyMeACoffeeContract', () => {
    it('should return correct contract data', () => {
      const contract = useBuyMeACoffeeContract();
      expect(contract).toEqual({
        abi: BuyMeACoffeeABI,
        address: '0xC06aFA3035217d6f93e965B89688ab94aAC5DB2a',
        status: 'ready',
        supportedChains: [baseSepolia],
      });
    });
  });

  describe('useCustom1155Contract', () => {
    it('should return correct contract data', () => {
      const contract = useCustom1155Contract();
      expect(contract).toEqual({
        abi: Custom1155ABI,
        address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
        status: 'ready',
        supportedChains: [baseSepolia],
      });
    });
  });

  describe('useSignatureMint721', () => {
    it('should return correct contract data', () => {
      const contract = useSignatureMint721();
      expect(contract).toEqual({
        abi: SignatureMint721ABI,
        address: '0x8d5acddd5e1ad1c624d84ff2e0455dd39fdb139e',
        status: 'ready',
        supportedChains: [baseSepolia],
      });
    });
  });
});
