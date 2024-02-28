import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { entryPoint } from '../constants';
import PaymasterBundlerABI from './PaymasterBundlerABI';

/**
 * Returns contract data for the PaymasterBundler contract.
 */
export const usePaymasterBundlerContract = generateContractHook({
  abi: PaymasterBundlerABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: entryPoint,
  },

  // ... more chains for this contract go here
});
