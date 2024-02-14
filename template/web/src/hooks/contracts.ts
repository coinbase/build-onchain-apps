import { Abi, Address, type Chain } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import BuyMeACoffeeABI from '../contract/BuyMeACoffee';
import Custom1155ABI from '../contract/Custom1155';
import SignatureMint721ABI from '../contract/SignatureMint721';

type ContractInstance = {
  chain: Chain;
  address: Address;
  deactivated?: boolean;
};

type UseContractReturn<T extends Abi> = { abi: T; supportedChains: Chain[] } & (
  | { address: Address; status: 'ready' }
  | { status: 'onUnsupportedNetwork' }
  | { status: 'notConnected' }
  | { status: 'deactivated' }
);

type Spec<T extends Abi> = {
  abi: T;
  [chainId: number]: ContractInstance;
};

/**
 * Generates a hook that returns contract data based on the current network.
 */
export function generateContractHook<T extends Abi>({ abi, ...spec }: Spec<T>) {
  function useContract(): UseContractReturn<typeof abi> {
    const { chain, isConnected } = useAccount();
    const supportedChains = Object.values(spec).map((s) => s.chain);

    if (!isConnected) {
      return { abi, status: 'notConnected', supportedChains };
    }

    if (chain && chain.id in spec) {
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

/**
 * Returns contract data for the BuyMeACoffee contract.
 */
export const useBuyMeACoffeeContract = generateContractHook({
  abi: BuyMeACoffeeABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0xC06aFA3035217d6f93e965B89688ab94aAC5DB2a',
  },

  // ... more chains for this contract go here
});

/**
 * Returns contract data for the Custom1155 contract.
 */
export const useCustom1155Contract = generateContractHook({
  abi: Custom1155ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
  },
  // more chains for this contract go here
});

/**
 * Returns contract data for the SignatureMint721 contract.
 */
export const useSignatureMint721 = generateContractHook({
  abi: SignatureMint721ABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x8d5acddd5e1ad1c624d84ff2e0455dd39fdb139e',
  },
  // more chains for this contract go here
});
