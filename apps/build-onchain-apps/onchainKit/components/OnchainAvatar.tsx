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
  });
  console.log('ensAvatar', address, ensName, ensAvatar);
  return (
    <img
      className="h-8 w-8 rounded-full"
      loading="lazy"
      width="16"
      height="16"
      decoding="async"
      src="https://via.placeholder.com/16x16"
    />
  );
}
