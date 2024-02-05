import { useEffect, useState } from 'react';
import Image from 'next/image';
import { baseSepolia } from 'viem/chains';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { useCollectionMetadata } from '../../../onchainKit';
import { useSignatureMint721 } from '../../hooks/contracts';
import { useDebounce } from '../../hooks/useDebounce';
import NotConnected from '../mint/NotConnected';
import SwitchNetwork from '../mint/SwitchNetwork';
import FreeMintButton from './FreeMintButton';
import PaidMintButton from './PaidMintButton';
import ViewContractLink from './ViewContractLink';

const EXPECTED_CHAIN = baseSepolia;

/**
 * Call the API backend to get a signature
 */
async function fetchSignature(chainId: number, address: `0x${string}` | undefined) {
  try {
    const response = await fetch(`/api/mint/signature/free?chainId=${chainId}&wallet=${address}`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = (await response.json()) as { signature: string };
    return result.signature;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default function SignatureMintDemo() {
  const [signature, setSignature] = useState('');
  const [sigFailure, setSigFailure] = useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const contract = useSignatureMint721();
  /**
   * Per Wagmi, we should debounce dynamic parameters
   * https://wagmi.sh/examples/contract-write-dynamic
   */
  const debouncedSigValue = useDebounce<string>(signature, 500);
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  const contractAddress = contract.status === 'ready' ? contract.address : undefined;

  const { collectionName, imageAddress, isLoading } = useCollectionMetadata(
    onCorrectNetwork,
    contractAddress,
    contract.abi,
  );

  useEffect(() => {
    if (chain && address) {
      fetchSignature(chain?.id, address)
        .then((result) => {
          setSigFailure(false);
          setSignature(result);
        })
        .catch((err) => {
          console.error(err);
          setSigFailure(true);
        });
    }
  }, [chain, address]);

  const usedFreeMintResponse = useContractRead({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'usedFreeMints',
    args: [address],
    enabled: (address?.length ?? 0) > 0,
    watch: true, // Watch for changes in the data and update the state if they use their free mint
    cacheTime: 0,
    staleTime: 0,
  });
  const usedFreeMint = Boolean(usedFreeMintResponse.data);

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
    <>
      <h3 className="mb-6 mt-10 text-4xl font-medium text-white">Signature Mint Contract</h3>
      <div className="grid grid-cols-1 items-stretch justify-start md:grid-cols-2mint md:gap-9">
        <div className="align-center flex flex-col justify-start gap-5">
          <Image src={imageAddress} alt={collectionName} width="300" height="300" />
        </div>
        <div className="flex flex-col justify-start gap-5 align-baseline">
          <p className="text-sm">
            The SignatureMint721 contract is an implementation of ERC721 for NFT minting with an
            added layer of security through signature-based authorization. This contract is ideal
            for scenarios where controlled distribution of NFTs is essential, such as exclusive
            digital art drops or access-controlled token issuance. By integrating this contract into
            your projects, you&apos;ll gain hands-on experience in managing NFT minting processes,
            understanding signature validation in Web3, and deploying secure, efficient smart
            contracts on the Ethereum blockchain.
            {sigFailure && (
              <p className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700" role="alert">
                <span className="font-medium">Warning!</span> There was a problem with the
                signature. Please follow the steps below and ensure SIGNATURE_MINT_PRIVATE_KEY is
                set in the environment file.
              </p>
            )}
            {!sigFailure && (
              <p className="text-sm">
                {!usedFreeMint && signature.length && (
                  <FreeMintButton
                    signatureMint721Contract={contract}
                    address={address}
                    signature={debouncedSigValue}
                  />
                )}
                {usedFreeMint && (
                  <button
                    type="button"
                    disabled
                    className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out focus:outline-none"
                  >
                    Freemint Used
                  </button>
                )}
                <PaidMintButton signatureMint721Contract={contract} address={address} />
                <ViewContractLink chain={chain} contractAddress={contractAddress} />
              </p>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
