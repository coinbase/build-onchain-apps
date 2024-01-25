import { GetEnsAvatarReturnType, GetEnsNameReturnType } from 'viem/ens';

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


export type ActionResponse = GetEnsNameReturnType | GetEnsAvatarReturnType | undefined;

export type ActionFunction = () => Promise<ActionResponse>;

export type ActionKey = string;
