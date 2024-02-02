import { baseSepolia } from 'viem/chains';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { useCollectionMetadata } from '../../../onchainKit';
import NextImage from '../../components/NextImage/NextImage';
import { useCustom1155Contract } from '../../hooks/contracts';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

const EXPECTED_CHAIN = baseSepolia;

export default function MintContractDemo() {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const contract = useCustom1155Contract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { collectionName, description, imageAddress, isLoading } = useCollectionMetadata(
    onCorrectNetwork,
    contract.status === 'ready' ? contract.address : undefined,
    contract.abi,
  );

  const { config } = usePrepareContractWrite({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    enabled: onCorrectNetwork,
  });

  // A future enhancement would be to use the `isLoading` and `isSuccess`
  // properties returned by `useContractWrite` to indicate transaction
  // status in the UI.
  const { write: mint } = useContractWrite(config);

  if (contract.status === 'notConnected') {
    return <NotConnected />;
  }

  if (contract.status === 'onUnsupportedNetwork') {
    return <SwitchNetwork />;
  }

  if (isLoading) {
    // A future enhancement would be a nicer spinner here.
    return <span className="text-xl">loading...</span>;
  }

  // TODO: Retrieve this dynamically
  const ethAmount = 0.0001;

  return (
    <div className="my-10 gap-16 lg:my-20 lg:flex">
      <div className="w-full flex-shrink-0 flex-grow lg:max-w-[400px] xl:max-w-[600px]">
        <NextImage
          src={imageAddress}
          altText={collectionName}
          className="block w-full rounded-2xl"
        />
      </div>
      <div className="flex-shrink-1 mt-10 w-full flex-grow-0 lg:mt-0">
        <h1 className="text-4xl font-bold">{collectionName}</h1>

        <h2 className="my-5">{String(ethAmount)} ETH</h2>

        <p className="my-4 text-sm text-boat-footer-light-gray">{description}</p>

        <button
          type="button"
          onClick={mint}
          className="my-8 block w-full rounded-full bg-white py-4 text-center text-sm text-black"
        >
          Mint
        </button>
      </div>
    </div>
  );
}
