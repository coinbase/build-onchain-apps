import { publicClient } from '../store/client';
import { inMemoryStorageService } from '../store/storageServices';
import { ActionResponse } from '../types';
import { useOnchainActionWithCache } from './useOnchainActionWithCache';
import type { Address } from 'viem';

const ensNameAction = (address?: Address) => async (): Promise<ActionResponse> => {
  if (!address) return undefined;
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
  const ensActionKey = address ?? '';
  const ensName = useOnchainActionWithCache(
    ensNameAction(address),
    ensActionKey,
    inMemoryStorageService,
  );
  return { ensName };
};
