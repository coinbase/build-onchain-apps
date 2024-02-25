import { useQuery } from '@tanstack/react-query';
import { Abi, Address } from 'abitype';
import { Chain } from 'viem/chains';
import { useAccount, usePublicClient } from 'wagmi';
import { ipfsToHTTP } from '@/utils/ipfs';

const AbiWithContractURI = [
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const AbiWithUri = [
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'uri',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

/**
 * There is some differences in URI standards between ERC721 and 1155, handle those in this component.
 */
const uriFunctionType = {
  uri: 'uri',
  contractURI: 'contractURI',
} as const;

const getIsAbiWithContractURIViewFunction = (abi: Abi) =>
  !!abi.find((el) => el.type === 'function' && el.name === uriFunctionType.contractURI);
const getIsAbiWithUriViewFunction = (abi: Abi) =>
  !!abi.find((el) => el.type === 'function' && el.name === uriFunctionType.uri);

const isValidAbi = (abi: Abi) =>
  getIsAbiWithContractURIViewFunction(abi) || getIsAbiWithUriViewFunction(abi);

// A future enhancement would be to track error state from the contract read
// and the fetch so that we can gracefully surface issues to users.
type CollectionMetadataResult = {
  collectionName: string | undefined;
  description: string | undefined;
  imageAddress: string | undefined;
};

type JsonMetadata = {
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;
};

function tryParseMetadataJson(
  str: string,
  gatewayHostname?: string,
): CollectionMetadataResult | undefined {
  try {
    const json = JSON.parse(str) as JsonMetadata;
    return {
      collectionName: json.name,
      description: json.description,
      imageAddress: json.image ? ipfsToHTTP(json.image, gatewayHostname) : undefined,
    };
  } catch {}
}

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
 * @returns CollectionMetadataResult
 */
export function useCollectionMetadata({
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

  //TODO: kinds of a hack, is there a more prescriptive way we can do this lookup?
  const isAbiWithContractURIViewFunction = getIsAbiWithContractURIViewFunction(abi);
  const contractMetadataFunctionName = isAbiWithContractURIViewFunction
    ? uriFunctionType.contractURI
    : uriFunctionType.uri;

  const hookEnabled =
    enabled && !!chainIdFromArgumentOrConnectedWallet && !!address && !!publicClient;

  return useQuery({
    queryKey: ['useCollectionMetadata', address, chainIdFromArgumentOrConnectedWallet],
    queryFn: async () => {
      if (!publicClient || !address) {
        throw new Error('Public client not available or address not provided');
      }

      if (!isValidAbi(abi)) {
        throw new Error('ABI does not contain a valid function to get contract metadata uri');
      }

      const contractURI = await publicClient?.readContract({
        abi: isAbiWithContractURIViewFunction ? AbiWithContractURI : AbiWithUri,
        // TODO: We should not hack a specific token here
        args: isAbiWithContractURIViewFunction ? [] : [BigInt(1)],
        functionName: contractMetadataFunctionName,
        address,
      });

      /**
       * Contract URIs can either be hosted externally (e.g. IPFS or HTTP) or stored as data within the contract itself as json.
       * While this is not defined in https://datatracker.ietf.org/doc/html/rfc3986#section-1.1.2 it is a common
       * practice out in the wild.
       * TODO: Also handle base64 encoded data i.e. `window.atob(str.split(';base64,')[1] || '')`
       */
      const jsonParsedMetadata = tryParseMetadataJson(contractURI, gatewayHostname);
      if (jsonParsedMetadata) {
        return jsonParsedMetadata;
      } else {
        const response = await fetch(ipfsToHTTP(contractURI, gatewayHostname));
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = (await response.json()) as JsonMetadata;
        return {
          collectionName: json.name,
          description: json.description,
          imageAddress: ipfsToHTTP(json.image || '', gatewayHostname),
        };
      }
    },
    refetchOnWindowFocus: false,
    enabled: hookEnabled,
    gcTime: cacheTime,
  });
}
