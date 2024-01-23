import { GetEnsNameReturnType, normalize } from 'viem/ens';
import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices'; 
import { useEnsData } from './useEnsData';

const fetchENSAvatar = async (ensName?: GetEnsNameReturnType) => {
  if (!ensName) return undefined;
  try {
    return await publicClient.getEnsAvatar({
      name: normalize(ensName),
    });
  } catch (err) {
    return undefined;
  }
};
/**
 * Fetches the ENS name for a given address.
 */
export const useEnsAvatar = (ensName?: GetEnsNameReturnType) => {
  const ensAvatar = useEnsData(fetchENSAvatar, [ensName], inMemoryStorageService);
  return { ensAvatar };
};
