/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEnsAvatar } from '../hooks/useEnsAvatar';
import { useEnsName } from '../hooks/useEnsName';
import type { Address } from 'viem';

type OnchainAvatarProps = {
  address?: Address;
  className?: string;
  props?: React.ImgHTMLAttributes<HTMLImageElement>;
};

/**
 * OnchainAvatar is a component that renders an avatar for an address.
 * It uses ENS to get the avatar.
 * If the address is not an ENS name, it will render a blue circle.
 */
export function OnchainAvatar({ address, className, props }: OnchainAvatarProps) {
  const { ensName } = useEnsName(address);
  const { ensAvatar } = useEnsAvatar(ensName);
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
      className={className ?? 'rounded-full'}
      loading="lazy"
      width="32"
      height="32"
      decoding="async"
      src={ensAvatar}
      alt={ensName}
      {...props}
    />
  );
}
