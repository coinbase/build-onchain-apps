import { useQuery } from '@tanstack/react-query';
import { Abi, Address } from 'abitype';
import { Chain } from 'viem/chains';
import { useAccount, usePublicClient } from 'wagmi';
import { getCollectionMetadataAction, JsonMetadata } from '@/actions/get-collection-metadata';

const minimalAbiWithContractURI = [
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Returns true if ABI has a contractURI view function
const getIsAbiWithContractURIViewFunction = (abi: Abi) => {
  const contractURIAbiFunction = abi.find((abiComponent) => {
    return abiComponent.type === 'function' && abiComponent.name === 'contractURI';
  }) as unknown as typeof minimalAbiWithContractURI;

  return !!contractURIAbiFunction;
};

type Props = {
  enabled: boolean;
  address: Address | undefined;
  abi: Abi;
  chainId?: Chain['id'];
  gatewayHostname?: string;
  cacheTime?: number;
};

/**
 * @param enabled Whether the app is in a state where contracts can be queried.
 * @param address Address for the contract
 * @param abi ABI for the contract
 * @param chainId Chain ID for the contract. If not provided, the chain ID from the connected wallet will be used.
 * @param gatewayHostname Optional IPFS gateway hostname
 * @param cacheTime Optional cache time for the query
 * TODO: standardize once https://github.com/ethereum/ERCs/pull/150 is settled
 * TODO: A future enhancement would be to track error state from the contract read and the fetch so that we can gracefully surface issues to users.
 * @returns JsonMetadata
 */
export function useNftCollectionMetadata({
  address,
  enabled,
  abi,
  chainId,
  gatewayHostname,
  cacheTime,
}: Props) {
  const { chain } = useAccount();
  const chainIdFromArgumentOrConnectedWallet = chainId ?? chain?.id;
  const publicClient = usePublicClient({ chainId: chainIdFromArgumentOrConnectedWallet });

  return useQuery<JsonMetadata>({
    queryKey: ['useCollectionMetadata', address, chainIdFromArgumentOrConnectedWallet],
    queryFn: async () => {
      if (!publicClient || !address) {
        throw new Error('Public client not available or address not provided');
      }

      if (!getIsAbiWithContractURIViewFunction(abi)) {
        throw new Error('ABI does not have a contractURI view function');
      }

      const metadataURI = await publicClient.readContract({
        abi: abi as typeof minimalAbiWithContractURI,
        functionName: 'contractURI',
        address,
        args: [],
      });

      // eslint-disable-next-line @typescript-eslint/return-await
      return await getCollectionMetadataAction({ metadataURI, gatewayHostname });
    },
    refetchOnWindowFocus: false,
    enabled: enabled && !!chainIdFromArgumentOrConnectedWallet,
    gcTime: cacheTime,
  });
}
