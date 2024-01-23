import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { useEnsData } from './useEnsData';
import type { Address } from 'viem';


const fetchENSName = async (address?: Address) => {
  if(!address) return undefined;
  try {
    return await publicClient.getEnsName({
      address,
    });
  } catch (err) {
    return undefined;
  }
};

/**
 * Fetches the ENS name for a given address.
 */
export const useEnsName = (address?: Address) => {
  const ensName = useEnsData(fetchENSName, [address], inMemoryStorageService);
  return { ensName };
};
