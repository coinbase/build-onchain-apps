/**
 * TODO Docs
 */
export const getSlicedAddress = (address: `0x${string}` | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};
