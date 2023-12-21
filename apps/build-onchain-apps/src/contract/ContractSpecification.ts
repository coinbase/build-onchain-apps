import { Abi, type Chain } from 'viem';
import { baseGoerli } from 'viem/chains';
import BuyMeACoffeeABI from './BuyMeACoffee';
import Custom1155ABI from './Custom1155';

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

export const contract: ContractSpecification = {
  buyMeACoffee: {
    abi: BuyMeACoffeeABI,
    [baseGoerli.id]: {
      chain: baseGoerli,
      address: '0x1784AAD01B4d05A8bC721DC8903dCbC9E0b20175',
    },
    // more chains for this contract go here
  },
  custom1155: {
    abi: Custom1155ABI,
    [baseGoerli.id]: {
      chain: baseGoerli,
      address: '0xBB955f815131818D62A220F70F5938daF812522d',
    },
    // more chains for this contract go here
  },
  // more contracts go here
};
