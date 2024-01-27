/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { getSlicedAddress } from '../core/address';
import type { Address } from 'viem';

type OnchainAvatarProps = {
  address?: Address;
  className?: string;
  props?: React.ImgHTMLAttributes<HTMLImageElement>;
};

/**
 * OnchainAddress is a component that renders an address.
 */
export function OnchainAddress({ address, className, props }: OnchainAvatarProps) {
  const [slicedAddress, setSlicedAddress] = useState<string | null>(null);

  useEffect(() => {
    setSlicedAddress(getSlicedAddress(address));
  }, [address]);
  return (
    <div className={className} {...props}>
      {slicedAddress}
    </div>
  );
}
