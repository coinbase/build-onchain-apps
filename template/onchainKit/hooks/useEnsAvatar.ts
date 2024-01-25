import { GetEnsNameReturnType, normalize } from 'viem/ens';
import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { ActionResponse } from '../types';
import { useOnchainActionWithCache } from './useOnchainActionWithCache';

export const ensAvatarAction =
  (ensName: GetEnsNameReturnType) => async (): Promise<ActionResponse> => {
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
export const useEnsAvatar = (ensName: GetEnsNameReturnType) => {
  const ensActionKey = `ens-avatar-${ensName}` ?? '';
  const ensAvatar = useOnchainActionWithCache(
    ensAvatarAction(ensName),
    ensActionKey,
    inMemoryStorageService,
  );
  return { ensAvatar };
};
