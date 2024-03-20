import { useQuery } from '@tanstack/react-query';
import { Address } from 'abitype';
import { Abi } from 'viem';
import { Chain } from 'viem/chains';
import { useAccount, usePublicClient } from 'wagmi';
import { getCollectionMetadataAction, JsonMetadata } from '@/actions/get-collection-metadata';

const minimalERC1155Abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'uri',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Returns true if ABI has an uri view function
const getIsAbiWithUriViewFunction = (abi: Abi) => {
  const uriAbiFunction = abi.find((abiComponent) => {
    return abiComponent.type === 'function' && abiComponent.name === 'uri';
  }) as unknown as typeof minimalERC1155Abi;

  return !!uriAbiFunction;
};

type Props = {
  tokenId?: bigint;
  enabled: boolean;
  abi: Abi;
  address: Address | undefined;
  chainId?: Chain['id'];
  gatewayHostname?: string;
  cacheTime?: number;
};

/**
 * @param enabled Conditionally run the hook query
 * @param address Address for the contract
 * @param abi ABI for the contract
 * @param tokenId token id to fetch uri for, defaults to 1n
 * @param chainId Chain ID for the contract. If not provided, the chain ID from the connected wallet will be used.
 * @param gatewayHostname Optional IPFS gateway hostname
 * @param cacheTime Optional cache time for the query
 * TODO: standardize once https://github.com/ethereum/ERCs/pull/150 is settled
 * TODO: A future enhancement would be to track error state from the contract read and the fetch so that we can gracefully surface issues to users.
 * @returns JsonMetadata
 */
export function useERC1155TokenMetadata({
  tokenId = 1n,
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

      if (!getIsAbiWithUriViewFunction(abi)) {
        throw new Error('ABI does not have a `uri` view function');
      }

      const uri = await publicClient.readContract({
        abi: abi as typeof minimalERC1155Abi,
        functionName: 'uri',
        address,
        args: [tokenId],
      });
      // eslint-disable-next-line @typescript-eslint/return-await
      return await getCollectionMetadataAction({ metadataURI: uri, gatewayHostname });
    },
    refetchOnWindowFocus: false,
    enabled: enabled && !!chainIdFromArgumentOrConnectedWallet,
    gcTime: cacheTime,
  });
}
