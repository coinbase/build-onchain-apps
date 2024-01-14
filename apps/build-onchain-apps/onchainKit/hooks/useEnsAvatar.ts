import { useEffect, useState } from 'react';
import { GetEnsAvatarReturnType, GetEnsNameReturnType, normalize } from 'viem/ens';
import { publicClient } from '../store/client';

/**
 * Fetches the ENS name for a given address.
 */
export const useEnsAvatar = (ensName?: GetEnsNameReturnType) => {
  const [ensAvatar, setEnsAvatar] = useState<GetEnsAvatarReturnType | null>(null);

  useEffect(() => {
    if (!ensName) return;

    const fetchENSAvatar = async () => {
      try {
        return await publicClient.getEnsAvatar({
          name: normalize(ensName),
        });
      } catch (err) {
        return null;
      }
    };

    fetchENSAvatar()
      .then((name) => {
        setEnsAvatar(name);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [ensName]);

  return { ensAvatar };
};
