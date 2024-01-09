import { Abi, type Chain } from 'viem';
import { baseGoerli, baseSepolia } from 'viem/chains';
import BuyMeACoffeeABI from './BuyMeACoffee';
import Custom1155ABI from './Custom1155';
import SignatureMint721 from './SignatureMint721';

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
    [baseSepolia.id]: {
      chain: baseSepolia,
      address: '0x839b0012eB39aA148b9d09BA533991aEF308041c'
    }
    // more chains for this contract go here
  },
  custom1155: {
    abi: Custom1155ABI,
    [baseGoerli.id]: {
      chain: baseGoerli,
      address: '0xBB955f815131818D62A220F70F5938daF812522d',
    },
  },
  signatureMint721: {
    abi: SignatureMint721,
    [baseGoerli.id]: {
      chain: baseGoerli,
      address: '0x22b03779693E4fB8bF03Ecc6b7480701dBA6Fb77',
    },
    [baseSepolia.id]: {
      chain: baseSepolia,
      address: '0x8d5acddd5e1ad1c624d84ff2e0455dd39fdb139e\n',
    },
  },
  // more contracts go here
};
