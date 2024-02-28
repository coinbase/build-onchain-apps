import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { contractAddress } from '../constants';
import PaymasterBundlerABI from './PaymasterBundlerABI';

/**
 * Returns contract data for the PaymasterBundler contract.
 */
export const usePaymasterBundlerContract = generateContractHook({
  abi: PaymasterBundlerABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: contractAddress,
  },

  // ... more chains for this contract go here
});
