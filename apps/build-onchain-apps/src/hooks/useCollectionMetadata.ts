import { useCallback, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { CONTRACT_CUSTOM_1155 } from '../contract/info';
import ipfsToHTTP from '../../src/utils/ipfsToHTTP';

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

/**
 * @param enabled Whether the app is in a state where contracts can be queried.
 * @returns CollectionMetadataResult
 */
function useCollectionMetadata(enabled: boolean) {
  const [result, setResult] = useState<CollectionMetadataResult>({
    collectionName: null,
    description: null,
    imageAddress: null,
    isLoading: true,
  });

  // In this case the contract URI is already HTTPS. A production-ready
  // solution would check the protocol and transform if necessary.
  const { data: contractURI } = useContractRead({
    address: CONTRACT_CUSTOM_1155.address,
    abi: CONTRACT_CUSTOM_1155.abi,
    functionName: 'uri',
    args: [BigInt(1)],
    enabled,
  });

  const fetchCollectionMetadata = useCallback(async () => {
    if (!contractURI) {
      return;
    }
    const response = await fetch(contractURI as URL);
    const json = (await response.json()) as { name: string; description: string; image: string };
    setResult({
      collectionName: json.name,
      description: json.description,
      imageAddress: ipfsToHTTP(json.image),
      isLoading: false,
    });
  }, [contractURI]);

  useEffect(() => {
    if (contractURI) {
      void fetchCollectionMetadata();
    }
  }, [contractURI, fetchCollectionMetadata]);

  return result;
}

export default useCollectionMetadata;
