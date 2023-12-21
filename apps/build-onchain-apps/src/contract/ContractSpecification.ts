import { Abi, type Chain } from 'viem';
import { baseGoerli } from 'viem/chains';
import BuyMeACoffeeABI from './BuyMeACoffee';

export type ContractInstance = {
  chain: Chain;
  address: `0x${string}`;
  deactivated?: boolean;
};

export type ContractSpecification = Record<
  string,
  {
    abi: Abi;
    [chainId: number]: ContractInstance;
  }
>;

export const contracts = {
  buyMeACoffee: {
    abi: BuyMeACoffeeABI,
    [baseGoerli.id]: {
      chain: baseGoerli,
      address: '0xeeC0bD3B58293ff45004C7eFf02917Beef28257c',
    },
    // more chains for this contract go here
  },
  // more contracts go here
};
