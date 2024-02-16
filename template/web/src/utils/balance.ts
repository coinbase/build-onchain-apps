import type { WagmiFetchBalanceResult } from '../../onchainKit/types';

/**
 * TODO Docs
 */
export const getAccountBalance = (data?: WagmiFetchBalanceResult) => {
  return `${data?.formatted.slice(0, 5)} ${data?.symbol}`;
};
