import { useCallback, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { useCustom1155Contract } from './contracts';
import { ipfsToHTTP } from '../onchain/utils/ipfs';

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
  const contract = useCustom1155Contract();
  const [result, setResult] = useState<CollectionMetadataResult>({
    collectionName: null,
    description: null,
    imageAddress: null,
    isLoading: true,
  });

  // In this case the contract URI is already HTTPS. A production-ready
  // solution would check the protocol and transform if necessary.
  const { data: contractURI } = useContractRead({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'uri',
    args: [BigInt(1)],
    enabled,
  });

  const fetchCollectionMetadata = useCallback(async () => {
    if (!contractURI) {
      return;
    }
    const response = await fetch(contractURI);
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
