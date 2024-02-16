export type WagmiFetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

/**
 * TODO Docs
 */
export const getAccountBalance = (data?: WagmiFetchBalanceResult) => {
  return `${data?.formatted.slice(0, 5)} ${data?.symbol}`;
};
