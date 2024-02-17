import { useCallback, useEffect, useState } from 'react';
import { Abi, Address } from 'abitype';
import { useReadContract } from 'wagmi';
import { ipfsToHTTP } from '@/utils/ipfs';

/**
 * There is some differences in URI standards between ERC721 and 1155, handle those in this component.
 */
enum UriFunctionType {
  uri = 'uri',
  contractURI = 'contractURI',
}
// A future enhancement would be to track error state from the contract read
// and the fetch so that we can gracefully surface issues to users.
type CollectionMetadataResult =
  | {
      collectionName: null;
      description: null;
      imageAddress: null;
      isLoading: true;
    }
  | {
      collectionName: string;
      description: string;
      imageAddress: string;
      isLoading: false;
    };

type JsonMetadata = {
  name: string;
  description: string;
  image: string;
};

function tryParseMetadataJson(str: string): CollectionMetadataResult | undefined {
  try {
    const json = JSON.parse(str) as JsonMetadata;
    return {
      collectionName: json.name,
      description: json.description,
      imageAddress: ipfsToHTTP(json.image),
      isLoading: false,
    } as CollectionMetadataResult;
  } catch (err) {}
  return;
}

/**
 * @param enabled Whether the app is in a state where contracts can be queried.
 * @param address Address for the contract
 * @param abi ABI for the contract
 * @param lookupType Lookup type to use for the contract URI function
 * TODO: standardize once https://github.com/ethereum/ERCs/pull/150 is settled
 * @returns CollectionMetadataResult
 */
export function useCollectionMetadata(enabled: boolean, address: Address | undefined, abi: Abi) {
  const [result, setResult] = useState<CollectionMetadataResult>({
    collectionName: null,
    description: null,
    imageAddress: null,
    isLoading: true,
  });
  let lookupType: UriFunctionType;
  //TODO: kinds of a hack, is there a more prescriptive way we can do this lookup?
  if (JSON.stringify(abi).includes('contractURI')) {
    lookupType = UriFunctionType.contractURI;
  } else {
    lookupType = UriFunctionType.uri;
  }
  // In this case the contract URI is already HTTPS. A production-ready
  // solution would check the protocol and transform if necessary.
  const { data: contractURI } = useReadContract({
    // TODO: the chainId should be dynamic
    address,
    abi,
    functionName: lookupType.toString(),
    // TODO: We should not hack a specific token here
    args: lookupType === UriFunctionType.uri ? [BigInt(1)] : undefined,
    query: {
      enabled,
    },
  });
  const fetchCollectionMetadata = useCallback(async () => {
    if (!contractURI) {
      return;
    }

    /**
     * Contract URIs can either be hosted externally (e.g. IPFS) or stored as data within the contract itself as json.
     * While this is not defined in https://datatracker.ietf.org/doc/html/rfc3986#section-1.1.2 it is a common
     * practice out in the wild.
     */
    const jsonParsedMetadata = tryParseMetadataJson(contractURI as string);
    if (jsonParsedMetadata) {
      setResult(jsonParsedMetadata);
    } else {
      const response = await fetch(contractURI as URL);
      const json = (await response.json()) as { name: string; description: string; image: string };
      setResult({
        collectionName: json.name,
        description: json.description,
        imageAddress: ipfsToHTTP(json.image),
        isLoading: false,
      });
    }
  }, [contractURI]);

  useEffect(() => {
    if (contractURI) {
      void fetchCollectionMetadata();
    }
  }, [contractURI, fetchCollectionMetadata]);

  return result;
}
