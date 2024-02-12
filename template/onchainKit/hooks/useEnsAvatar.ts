import { GetEnsAvatarReturnType, GetEnsNameReturnType, normalize } from 'viem/ens';
import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { useOnchainActionWithCache } from './useOnchainActionWithCache';

export const ensAvatarAction =
  (ensName?: GetEnsNameReturnType) => async (): Promise<GetEnsAvatarReturnType> => {
    if (!ensName) return null;
    try {
      return await publicClient.getEnsAvatar({
        name: normalize(ensName),
      });
    } catch (err) {
      return null;
    }
  };
/**
 * Fetches the ENS name for a given address.
 */
export const useEnsAvatar = (ensName?: GetEnsNameReturnType) => {
  const ensActionKey = `ens-avatar-${ensName}` ?? '';
  //TODO: Wagmi's useEnsAvatar hook already uses react-query that has caching built-in. So useOnchainActionWithCache seems redundant
  const ensAvatar = useOnchainActionWithCache(
    ensAvatarAction(ensName),
    ensActionKey,
    inMemoryStorageService,
  );
  return { ensAvatar };
};
