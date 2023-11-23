export type OnchainAccountAddress = `0x${string}`;

export type WagmiFetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};
