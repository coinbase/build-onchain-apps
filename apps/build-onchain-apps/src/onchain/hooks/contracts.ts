import { Abi, type Chain } from 'viem';
import { baseGoerli, baseSepolia } from 'viem/chains';
import { useNetwork } from 'wagmi';
import BuyMeACoffeeABI from '../../contract/BuyMeACoffee';
import Custom1155ABI from '../../contract/Custom1155';
import SignatureMint721ABI from '../../contract/SignatureMint721';

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
  [baseGoerli.id]: {
    // TODO: this can be derived from the id which is the key of this object.
    // We can reduce boilerplate by doing so, but may make it less flexible.
    chain: baseGoerli,
    address: '0x1784AAD01B4d05A8bC721DC8903dCbC9E0b20175',
  },
  // ... more chains for this contract go here
});

export const useCustom1155Contract = generateContractHook({
  abi: Custom1155ABI,
  [baseGoerli.id]: {
    chain: baseGoerli,
    address: '0xBB955f815131818D62A220F70F5938daF812522d',
  },
  // more chains for this contract go here
});

export const useSignatureMint721 = generateContractHook({
  abi: SignatureMint721ABI,
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
