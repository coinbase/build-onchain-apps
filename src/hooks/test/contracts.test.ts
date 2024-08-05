/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { base, baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { Environment, EnvironmentKeys } from '@/store/environment';
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
    const OLD_ENV = process.env;

    beforeEach(() => {
      mockUseAccount.mockClear();

      /** reference: https://stackoverflow.com/a/48042799 */
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterEach(() => {
      process.env = OLD_ENV;
    });

    it.each([
      ['onUnsupportedNetwork', { id: 31337 }, Environment.localhost, undefined],
      ['onUnsupportedNetwork', { id: base.id }, Environment.localhost, undefined],
      ['ready', undefined, Environment.localhost, '0xbaseSepolia'],
      ['ready', undefined, Environment.development, '0xbaseSepolia'],
      ['ready', undefined, Environment.staging, '0xbaseSepolia'],
      ['ready', undefined, Environment.production, '0xbaseSepolia'],
      ['ready', { id: baseSepolia.id }, Environment.localhost, '0xbaseSepolia'],
    ])('handles %s state', (state, chain, environment, address) => {
      mockUseAccount.mockImplementation(() => ({ chain }) as ReturnType<typeof useAccount>);
      process.env[EnvironmentKeys.environment] = environment;

      const {
        result: { current },
      } = renderHook(() => useTestContract());
      expect(current.status).toBe(state);
      expect(current.abi).toEqual(MockABI);
      expect(current.supportedChains).toEqual([baseSepolia]);
      if (address) {
        expect(current).toEqual(expect.objectContaining({ address }));
      } else {
        expect(current).not.toHaveProperty('address');
      }
    });
  });
});
