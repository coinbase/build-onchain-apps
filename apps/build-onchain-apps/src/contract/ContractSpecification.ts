import { Abi, type Chain } from 'viem';
import { baseGoerli, baseSepolia } from 'viem/chains';
import { useNetwork } from 'wagmi';
import BuyMeACoffeeABI from './BuyMeACoffee';
import Custom1155ABI from './Custom1155';
import SignatureMint721 from './SignatureMint721';

type ContractInstance = {
  chain: Chain;
  address: `0x${string}`;
  deactivated?: boolean;
};

type UseContractReturn<T extends Abi> =
  | { abi: T; address: `0x${string}`; status: 'ready' }
  | { abi: T; status: 'onUnsupportedNetwork' }
  | { abi: T; status: 'notConnected' }
  | { abi: T; status: 'deactivated' };

type Spec<T extends Abi> = {
  abi: T;
  [chainId: number]: ContractInstance;
};

export function generateContractHook<T extends Abi>({ abi, ...spec }: Spec<T>) {
  function useContract(): UseContractReturn<typeof abi> {
    const { chain } = useNetwork();

    if (!chain) {
      return { abi, status: 'notConnected' };
    }

    if (chain.id in spec) {
      if (spec[chain.id].deactivated) {
        return { abi, status: 'deactivated' };
      }

      return {
        abi,
        address: spec[chain.id].address,
        status: 'ready',
      };
    }

    return {
      abi,
      status: 'onUnsupportedNetwork',
    };
  }

  return useContract;
}

export const useBuyMeACoffee = generateContractHook({
  abi: BuyMeACoffeeABI,
  [baseGoerli.id]: {
    chain: baseGoerli,
    address: '0x1784AAD01B4d05A8bC721DC8903dCbC9E0b20175',
  },
  // ... more chains for this contract go here
});

export const useCustom1155 = generateContractHook({
  abi: Custom1155ABI,
  [baseGoerli.id]: {
    chain: baseGoerli,
    address: '0xBB955f815131818D62A220F70F5938daF812522d',
  },
  // more chains for this contract go here
});

export const useSignatureMint721 = generateContractHook({
  abi: SignatureMint721,
  [baseGoerli.id]: {
    chain: baseGoerli,
    address: '0x22b03779693E4fB8bF03Ecc6b7480701dBA6Fb77',
  },
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x8d5acddd5e1ad1c624d84ff2e0455dd39fdb139e\n',
  },
  // more chains for this contract go here
});
