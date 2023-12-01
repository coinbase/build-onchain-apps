import { Flex, Grid, Text, Code, Button } from '@radix-ui/themes';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from 'wagmi';
import { baseGoerli } from 'viem/chains';
import { useCallback, useEffect, useState } from 'react';
import abi from '@/onchain/contract/Custom1155';

// A future enhancement would be to support multiple mints, getting chain, abi, and
// contract address through dynamic routes, like `/mints/[tokenType]/[chain]/[contractAddress]`
const CONTRACT_ADDRESS: `0x${string}` = '0xBB955f815131818D62A220F70F5938daF812522d';
const EXPECTED_CHAIN = baseGoerli;

const CONTRACT = {
  abi,
  address: CONTRACT_ADDRESS,
};

export function Mint() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { collectionName, description, imageAddress, isLoading } =
    useCollectionMetadata(onCorrectNetwork);

  const { config } = usePrepareContractWrite({
    ...CONTRACT,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    enabled: onCorrectNetwork,
  });

  // A future enhancement would be to use the `isLoading` and `isSuccess`
  // properties returned by `useContractWrite` to indicate transaction
  // status in the UI.
  const { write: mint } = useContractWrite(config);

  if (!isConnected) {
    return <NotConnected />;
  }

  if (!onCorrectNetwork) {
    return <SwitchNetwork />;
  }

  if (isLoading) {
    // A future enhancement would be a nicer spinner here.
    return <Text size="5">loading...</Text>;
  }

  return (
    <Grid columns={{ md: '420px 1fr' }} gap={{ md: '9' }}>
      <Flex direction="column" align="center" gap="5">
        <img src={imageAddress} alt={collectionName} />
      </Flex>
      <Flex direction="column" align="center" gap="5">
        <Text size="5" weight="bold" mb="1">
          <Code color="crimson">{collectionName}</Code>
        </Text>
        <Text>{description}</Text>
        <Button onClick={mint}>Mint for free (requires gas)</Button>
      </Flex>
    </Grid>
  );
}

function NotConnected() {
  return <Text size="5">Please connect your wallet to continue.</Text>;
}

function SwitchNetwork() {
  const { switchNetwork } = useSwitchNetwork({ chainId: EXPECTED_CHAIN.id });
  const handleClick = useCallback(() => (switchNetwork ? switchNetwork() : null), [switchNetwork]);
  return (
    <Flex direction="column">
      <Text>Please switch to {EXPECTED_CHAIN.name}</Text>
      <Button onClick={handleClick}>Switch Network</Button>
    </Flex>
  );
}

/**
 * @param ipfsURI An ipfs protocol URI.
 * @returns An HTTPS URI that points to the data represented by the cid
 * embedded in the ipfs URI.
 */
function ipfsToHTTP(ipfsURI: string) {
  const cid = ipfsURI.replace('ipfs://', '');
  // This is a free public gateway. For production use, you'll likely want a
  // paid provider.
  return `https://ipfs.io/ipfs/${cid}`;
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
    ...CONTRACT,
    functionName: 'uri',
    args: [BigInt(1)],
    enabled,
  });

  const fetchCollectionMetadata = useCallback(async (contractURI: string) => {
    const response = await fetch(contractURI);
    const json = (await response.json()) as { name: string; description: string; image: string };
    setResult({
      collectionName: json.name,
      description: json.description,
      imageAddress: ipfsToHTTP(json.image),
      isLoading: false,
    });
  }, []);

  useEffect(() => {
    if (contractURI) {
      void fetchCollectionMetadata(contractURI);
    }
  }, [contractURI, fetchCollectionMetadata]);

  return result;
}
