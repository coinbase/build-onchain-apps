import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import type { Address, GetEnsNameReturnType } from 'viem';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

/**
 * Fetches the ENS name for a given address.
 */
const useEnsName = (address?: Address) => {
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

export default useEnsName;
