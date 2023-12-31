/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Address as AddressType, isAddress } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';

type OnchainAvatarProps = {
  address?: AddressType;
};

/**
 * TODO Docs
 */
export function OnchainAvatar({ address }: OnchainAvatarProps) {
  const { data: ensName } = useEnsName({
    address,
    enabled: isAddress(address ?? ''),
    chainId: 1,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: Boolean(ensName),
    chainId: 1,
    cacheTime: 60_000,
  });
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
