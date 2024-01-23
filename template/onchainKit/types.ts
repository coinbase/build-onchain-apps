export type WagmiFetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

export type StorageInterface = {
  getData: (key: string) => Promise<string | null | undefined>;
  setData: (key: string, value: string | null | undefined) => Promise<void>;
}
