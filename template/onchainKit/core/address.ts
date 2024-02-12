import { Address } from 'viem';

/**
 * getSlicedAddress returns the first 5 and last 4 characters of an address.
 */
export const getSlicedAddress = (address: Address | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};
