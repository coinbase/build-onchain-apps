import type { Address } from 'viem';

export type CoffeeMemo = {
  userName: string;
  message: string;
  userAddress: Address;
  time: bigint;
};
