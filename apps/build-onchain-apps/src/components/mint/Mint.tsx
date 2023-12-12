import { Flex, Grid, Text, Code, Button } from '@radix-ui/themes';
import Image from 'next/image';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { baseGoerli } from 'viem/chains';
import { CONTRACT_CUSTOM_1155 } from '../../onchain/contract/contractInfo';
import useCollectionMetadata from '../../hooks/useCollectionMetadata';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

const EXPECTED_CHAIN = baseGoerli;

function Mint() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { collectionName, description, imageAddress, isLoading } =
    useCollectionMetadata(onCorrectNetwork);

  const { config } = usePrepareContractWrite({
    address: CONTRACT_CUSTOM_1155.address,
    abi: CONTRACT_CUSTOM_1155.abi,
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
        <Image src={imageAddress} alt={collectionName} width="300" height="300" />
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

export default Mint;
