import { Abi, type Chain } from 'viem';
import {  baseSepolia } from 'viem/chains';
import { useNetwork } from 'wagmi';
import BuyMeACoffeeABI from '../contract/BuyMeACoffee';
import Custom1155ABI from '../contract/Custom1155';
import SignatureMint721ABI from '../contract/SignatureMint721';

type ContractInstance = {
  chain: Chain;
  address: `0x${string}`;
  deactivated?: boolean;
};

type UseContractReturn<T extends Abi> = { abi: T; supportedChains: Chain[] } & (
  | { address: `0x${string}`; status: 'ready' }
  | { status: 'onUnsupportedNetwork' }
  | { status: 'notConnected' }
  | { status: 'deactivated' }
);

type Spec<T extends Abi> = {
  abi: T;
  [chainId: number]: ContractInstance;
};

export function generateContractHook<T extends Abi>({ abi, ...spec }: Spec<T>) {
  function useContract(): UseContractReturn<typeof abi> {
    const { chain } = useNetwork();
    const supportedChains = Object.values(spec).map((s) => s.chain);

    if (!chain) {
      return { abi, status: 'notConnected', supportedChains };
    }

    if (chain.id in spec) {
      if (spec[chain.id].deactivated) {
        return { abi, status: 'deactivated', supportedChains };
      }

      return {
        abi,
        address: spec[chain.id].address,
        status: 'ready',
        supportedChains,
      };
    }

    return {
      abi,
      status: 'onUnsupportedNetwork',
      supportedChains,
    };
  }

  return useContract;
}

export const useBuyMeACoffeeContract = generateContractHook({
  abi: BuyMeACoffeeABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x839b0012eB39aA148b9d09BA533991aEF308041c',
  },

  // ... more chains for this contract go here
});

export const useCustom1155Contract = generateContractHook({
  abi: Custom1155ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
  },
  // more chains for this contract go here
});

export const useSignatureMint721 = generateContractHook({
  abi: SignatureMint721ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x8d5acddd5e1ad1c624d84ff2e0455dd39fdb139e\n',
  },
  // more chains for this contract go here
});
