import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { ActionResponse } from '../types';
import { useOnchainActionWithCache } from './useOnchainActionWithCache';
import type { Address } from 'viem';

export const ensNameAction = (address: Address) => async (): Promise<ActionResponse> => {
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
export const useEnsName = (address: Address) => {
  const ensActionKey = `ens-name-${address}`;
  const ensName = useOnchainActionWithCache(
    ensNameAction(address),
    ensActionKey,
    inMemoryStorageService,
  );
  return { ensName };
};
