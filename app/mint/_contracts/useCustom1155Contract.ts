import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import Custom1155ABI from './Custom1155ABI';

/**
 * Returns contract data for the Custom1155 contract.
 */
export const useCustom1155Contract = generateContractHook({
  abi: Custom1155ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
  },
  // more chains for this contract go here
});
