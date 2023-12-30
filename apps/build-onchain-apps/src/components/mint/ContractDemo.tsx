import { Flex, Grid, Code, Button } from '@radix-ui/themes';
import Image from 'next/image';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { baseGoerli } from 'viem/chains';
import { contract } from '../../contract/ContractSpecification';
import useCollectionMetadata from '../../hooks/useCollectionMetadata';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

const EXPECTED_CHAIN = baseGoerli;

export default function MintContractDemo() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { collectionName, description, imageAddress, isLoading } =
    useCollectionMetadata(onCorrectNetwork);

  const { config } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address: contract.custom1155[baseGoerli.id].address,
    abi: contract.custom1155.abi,
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
    return <span className="text-xl">loading...</span>;
  }

  return (
    <Grid columns={{ md: '420px 1fr' }} gap={{ md: '9' }}>
      <Flex direction="column" align="center" gap="5">
        <Image src={imageAddress} alt={collectionName} width="300" height="300" />
      </Flex>
      <Flex direction="column" align="center" gap="5">
        <p className="mb-1 text-xl font-bold">
          <Code color="crimson">{collectionName}</Code>
        </p>
        <p className="text-sm">{description}</p>
        <Button onClick={mint}>Mint for free (requires gas)</Button>
      </Flex>
    </Grid>
  );
}
