// Minimal ABI with contractURI view function
import { Abi, Address } from 'abitype';
import { PublicClient } from 'viem';
import { ipfsToHTTP } from '@/utils/ipfs';

const AbiFunctionContractURI = [
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Minimal ABI with uri view function
const AbiFunctionWithUri = [
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

// Returns true if ABI has a contractURI view function
const getIsAbiWithContractURIViewFunction = (abi: Abi) => {
  const contractURIAbiFunction = abi.find(
    (abiComponent) => {
      return abiComponent.type === 'function' && abiComponent.name === uriFunctionType.contractURI;
    },
  ) as unknown as typeof AbiFunctionContractURI;

  return !!contractURIAbiFunction;
}

// Returns true if ABI has a uri view function
const getIsAbiWithUriViewFunction = (abi: Abi) => {
  const uriAbiFunction = abi.find(
    (abiComponent) => {
      return abiComponent.type === 'function' && abiComponent.name === uriFunctionType.uri
    }
  ) as unknown as typeof AbiFunctionWithUri;

  return !!uriAbiFunction;
}

// Return true if the ABI has either a contractURI or uri view function
const isValidAbi = (abi: Abi) => {
  const hasContractUriAbiFunction = getIsAbiWithContractURIViewFunction(abi)
  const hasUriAbiFunction = getIsAbiWithUriViewFunction(abi);

  return hasContractUriAbiFunction || hasUriAbiFunction;
}

export type JsonMetadata = {
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;
};

function tryParseMetadataJson(str: string, gatewayHostname?: string): JsonMetadata | undefined {
  try {
    const json = JSON.parse(str) as JsonMetadata;
    return {
      name: json.name,
      description: json.description,
      image: json.image ? ipfsToHTTP(json.image, gatewayHostname) : undefined,
    };
  } catch {}
}

/**
 * Fetches the collection metadata from the contract.
 * @param abi ABI for the contract
 * @param publicClient Public viem client
 * @param address Address for the contract
 * @param gatewayHostname Optional IPFS gateway hostname
 * @returns {Promise<JsonMetadata>} The collection metadata
 */
export const getCollectionMetadataAction = async ({
  abi,
  publicClient,
  address,
  gatewayHostname,
}: {
  address: Address;
  abi: Abi;
  publicClient: PublicClient;
  gatewayHostname?: string;
}): Promise<JsonMetadata> => {
  if (!isValidAbi(abi)) {
    throw new Error('ABI does not contain a valid function to get contract metadata uri');
  }

  //TODO: kinds of a hack, is there a more prescriptive way we can do this lookup?
  const isAbiWithContractURIViewFunction = getIsAbiWithContractURIViewFunction(abi);

  const contractURI = isAbiWithContractURIViewFunction
    ? await publicClient?.readContract({
        abi: AbiFunctionContractURI,
        args: [],
        functionName: uriFunctionType.contractURI,
        address,
      })
    : await publicClient?.readContract({
        abi: AbiFunctionWithUri,
        args: [BigInt(1)],
        functionName: uriFunctionType.uri,
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
      name: json.name,
      description: json.description,
      image: ipfsToHTTP(json.image ?? '', gatewayHostname),
    };
  }
};
