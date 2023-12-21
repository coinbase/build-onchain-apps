import BuyMeACoffeeABI from './BuyMeACoffee';
import Custom1155ABI from './Custom1155';
import type { Abi } from 'abitype';

type Contract = {
  abi: Abi;
  address: `0x${string}`;
};

export const CONTRACT_BUY_ME_COFFEE: Contract = {
  abi: BuyMeACoffeeABI,
  address: '0x1784AAD01B4d05A8bC721DC8903dCbC9E0b20175',
};

// TODO: A future enhancement would be to support multiple mints, getting chain, abi, and
// contract address through dynamic routes, like `/mints/[tokenType]/[chain]/[contractAddress]`
export const CONTRACT_CUSTOM_1155: Contract = {
  abi: Custom1155ABI,
  address: '0xBB955f815131818D62A220F70F5938daF812522d',
};
