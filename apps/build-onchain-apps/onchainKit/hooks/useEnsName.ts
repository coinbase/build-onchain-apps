import { useEffect, useState } from 'react';
import { publicClient } from '../store/client';
import type { Address, GetEnsNameReturnType } from 'viem';

/**
 * Fetches the ENS name for a given address.
 */
export const useEnsName = (address?: Address) => {
  const [ensName, setEnsName] = useState<GetEnsNameReturnType | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchENSName = async () => {
      try {
        return await publicClient.getEnsName({
          address,
        });
      } catch (err) {
        return null;
      }
    };

    fetchENSName()
      .then((name) => {
        setEnsName(name);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [address]);

  return { ensName };
};
