import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { parseEther } from 'viem';
import { Chain } from 'viem/chains';
import { useAccount, useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import { useBlockExplorerLink, useCollectionMetadata } from '../../../onchainKit';
import { EXPECTED_CHAIN } from '../../constants';
import { useSignatureMint721 } from '../../hooks/contracts';
import { useDebounce } from '../../hooks/useDebounce';
import NotConnected from '../mint/NotConnected';
import SwitchNetwork from '../mint/SwitchNetwork';

export default function SignatureMintDemo() {
  const [signature, setSignature] = useState('');
  const [sigFailure, setSigFailure] = useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useAccount();
  const contract = useSignatureMint721();
  /**
   * Per Wagmi, we should debounce dynamic parameters
   * https://wagmi.sh/examples/contract-write-dynamic
   */
  const debouncedSigValue = useDebounce<string>(signature, 500);
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  const contractAddress = contract.status === 'ready' ? contract.address : undefined;
  const explorerLink = useBlockExplorerLink(chain as Chain, contractAddress);
  const [usedFreeMint, setUsedFreeMint] = useState(false);

  const { collectionName, imageAddress, isLoading } = useCollectionMetadata(
    onCorrectNetwork,
    contractAddress,
    contract.abi,
  );

  /**
   * Call the API backend to get a signature
   */
  const fetchSig = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/mint/signature/free?chainId=${chain?.id}&wallet=${address}`,
      );
      if (!response.ok) {
        setSigFailure(true);
        return console.error(response);
      }
      const result = (await response.json()) as { signature: string };
      setSignature(result.signature);
    } catch (err) {
      setSigFailure(true);
      console.error(err);
    }
  }, [chain, address]);

  useEffect(() => {
    if (chain && address) {
      void fetchSig();
    }
  }, [fetchSig, chain, address]);

  /**
   * Free Mint Contract Logic
   */
  const { data: freeMintConfig } = useSimulateContract({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'freeMint',
    args: address ? [address, debouncedSigValue] : undefined,
    query: {
      enabled: signature.length > 0,
    },
  });
  const { writeContract: freeMint } = useWriteContract();

  /**
   * Paid Mint Contract Write Logic
   */
  const { data: paidMintConfig } = useSimulateContract({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'mint',
    args: [address],
    value: parseEther('0.0001'), // You should read the contract, however, setting this to value to prevent abuse.
  });
  const { writeContract: paidMint } = useWriteContract();

  const usedFreeMintResponse = useReadContract({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'usedFreeMints',
    args: [address],
    query: {
      enabled: (address?.length ?? 0) > 0,
      staleTime: 0,
    },
  });

  useEffect(() => {
    setUsedFreeMint(usedFreeMintResponse.data as boolean);
  }, [usedFreeMintResponse.data]);

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
            {!sigFailure && freeMintConfig?.request && (
              <p className="text-sm">
                {!usedFreeMint && signature.length && (
                  <button
                    type="button"
                    onClick={() => freeMint(freeMintConfig?.request)}
                    className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
                  >
                    Mint NFT Free
                  </button>
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
                {paidMintConfig?.request && (
                  <button
                    type="button"
                    onClick={() => paidMint(paidMintConfig?.request)}
                    className="focus:shadow-outline ml-3 rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
                  >
                    Paid Mint
                  </button>
                )}

                {explorerLink && (
                  <a
                    href={explorerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:shadow-outline ml-3 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
                  >
                    {' '}
                    View Contract
                  </a>
                )}
              </p>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
