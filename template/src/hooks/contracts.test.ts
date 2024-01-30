/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { baseSepolia } from 'viem/chains';
import { useNetwork } from 'wagmi';
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
  useNetwork: jest.fn(() => ({ chain: undefined })),
}));

const mockUseNetwork = useNetwork as jest.MockedFunction<typeof useNetwork>;

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
      mockUseNetwork.mockClear();
    });

    it.each([
      ['notConnected', undefined, undefined],
      ['onUnsupportedNetwork', { id: 31337 }, undefined],
      ['ready', { id: baseSepolia.id }, '0xbaseSepolia'],
    ])('handles %s state', (state, chain, address) => {
      mockUseNetwork.mockImplementation(() => ({ chain: chain }) as ReturnType<typeof useNetwork>);
      const {
        result: { current },
      } = renderHook(() => useTestContract());
      expect(current.status).toBe(state);
      expect(current.abi).toEqual(BuyMeACoffeeABI);
      expect(current.supportedChains).toEqual([baseSepolia]);
      if (address) {
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
        address: '0x5B21D983AF66577814DFfd9043424a6d9E06708D',
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
