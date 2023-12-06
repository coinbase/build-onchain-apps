import { Flex, Grid, Text, Code, Button } from '@radix-ui/themes';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { baseGoerli } from 'viem/chains';
import abi from '@/onchain/contract/Custom1155';
import useCollectionMetadata from '../hooks/useCollectionMetadata';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

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
