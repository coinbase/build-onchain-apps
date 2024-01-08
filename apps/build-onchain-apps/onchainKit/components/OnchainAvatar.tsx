/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import type { Address, GetEnsNameReturnType } from 'viem';

type OnchainAvatarProps = {
  address?: Address;
};

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

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

/**
 * TODO Docs
 */
export function OnchainAvatar({ address }: OnchainAvatarProps) {
  const ensAvatar = '';
  const ensName = useEnsName(address);
  console.log('address', address);
  console.log('ensName', ensName);
  if (!ensName || !ensAvatar) {
    // TODO add message that explain this issue
    // https://github.com/wevm/wagmi/issues/554
    return (
      <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32">
        <circle fill="blue" cx="16" cy="16" r="16" />
      </svg>
    );
  }
  return (
    <img
      className="rounded-full"
      loading="lazy"
      width="32"
      height="32"
      decoding="async"
      src={ensAvatar}
    />
  );
}
