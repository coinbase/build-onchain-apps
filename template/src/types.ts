import type { Address } from 'viem';

export type CoffeeMemo = {
  numCoffees: bigint;
  userName: string;
  message: string;
  userAddress: Address;
  time: bigint;
  twitterHandle?: string;
};
