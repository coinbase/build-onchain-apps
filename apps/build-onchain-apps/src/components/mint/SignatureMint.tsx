import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { parseEther } from 'viem';
import { baseSepolia, Chain } from 'viem/chains';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import useBlockExplorerLink from '../../../onchainKit/hooks/useBlockExplorerLink';
import useCollectionMetadata from '../../../onchainKit/hooks/useCollectionMetadata';
import { useSignatureMint721 } from '../../hooks/contracts';
import { useDebounce } from '../../hooks/useDebounce';
import CodeBlock from '../CodeBlock/CodeBlock';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

const EXPECTED_CHAIN = baseSepolia;

/**
 * Use constants for codeblocks until the component will respect newlines.
 */
const codeBlock1 = `function genWallet() {
  const wallet = ethers.Wallet.createRandom();
  console.log(wallet.privateKey);
  console.log(wallet.address);
}`;
const codeBlock2 = `# Edit the .env file and add the following key:

SIGNATURE_MINT_SIGNER="WalletAddressFromAbove"
        `;

const codeBlock3 = `# Edit the .env file and add the following key:
SIGNATURE_MINT_SIGNER="WalletAddressFromAbove"
`;

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
  const { config: freeMintConfig } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'freeMint',
    args: address ? [address, debouncedSigValue] : undefined,
    enabled: signature.length > 0,
  });
  const { write: freeMint } = useContractWrite(freeMintConfig);

  /**
   * Paid Mint Contract Write Logic
   */
  const { config: paidMintConfig } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'mint',
    args: [address],
    value: parseEther('0.0001'), // You should read the contract, however, setting this to value to prevent abuse.
  });
  const { write: paidMint } = useContractWrite(paidMintConfig);

  const usedFreeMintResponse = useContractRead({
    // TODO: the chainId should be dynamic
    address: contractAddress,
    abi: contract.abi,
    functionName: 'usedFreeMints',
    args: [address],
    enabled: (address?.length ?? 0) > 0,
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
      <h3 className="text-white mb-6 text-4xl font-medium">Signature Mint Contract</h3>
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
              <p className="bg-yellow-100 text-yellow-700 mb-4 rounded-lg p-4 text-sm" role="alert">
                <span className="font-medium">Warning!</span> There was a problem with the
                signature. Please follow the steps below and ensure SIGNATURE_MINT_SIGNER is set in
                the environment file.
              </p>
            )}
            {!sigFailure && (
              <p className="text-sm">
                {!usedFreeMint && signature.length && (
                  <button
                    type="button"
                    onClick={freeMint}
                    className="focus:shadow-outline bg-green-500 text-white hover:bg-green-600 rounded px-4 py-2 font-bold transition duration-300 ease-in-out focus:outline-none"
                  >
                    Mint NFT Free
                  </button>
                )}
                {usedFreeMint && (
                  <button
                    type="button"
                    disabled
                    className="focus:shadow-outline bg-gray-500 text-white rounded px-4 py-2 font-bold transition duration-300 ease-in-out focus:outline-none"
                  >
                    Freemint Used
                  </button>
                )}
                <button
                  type="button"
                  onClick={paidMint}
                  className="focus:shadow-outline bg-green-500 text-white hover:bg-green-600 ml-3 rounded px-4 py-2 font-bold transition duration-300 ease-in-out focus:outline-none"
                >
                  Paid Mint
                </button>
                {explorerLink && (
                  <a
                    href={explorerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:shadow-outline bg-blue-500 text-white hover:bg-blue-600 ml-3 inline-block rounded px-4 py-2 font-bold transition duration-300 ease-in-out focus:outline-none"
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

      <h3 className="text-white mb-6 mt-6 text-4xl font-medium">Getting started</h3>
      <div className="bg-white h-px" />
      <section className="mb-6 mt-10 flex flex-col">
        <h4 className="text-white text-xl font-normal">Step 1 : Create Signer</h4>
        <p className="text-zinc-400 my-4 text-base font-normal">
          1. Create a wallet that will act as your signer on your backend. You can use wallets like
          Coinbase, Metamask assuming you can export the private key. As a best practice avoid
          reusing private keys for multiple thing & do not store funds in this wallet. Also, you can
          use popular library like Ethers to
        </p>
        <CodeBlock code={codeBlock1} />
        2. Next add that wallet to the contracts project environment file
        <CodeBlock code={codeBlock2} />
        <h4 className="text-white mb-6 mt-6 text-xl font-normal">Step 2 : Deploy Contract</h4>
        <p className="text-zinc-400 my-4 text-base font-normal">
          Deploy the contract to base-sepolia
        </p>
        <CodeBlock
          code="
          forge script script/SignatureMintERC721.s.sol:SignatureMintERC721Script --broadcast --verify --rpc-url ${RPC_URL} --etherscan-api-key ${BLOCK_EXPLORER_API_KEY}
        "
        />
        <h4 className="text-white mb-6 mt-6 text-xl font-normal">
          Step 3 : Add Private Key to backend
        </h4>
        <p className="text-zinc-400 my-4 text-base font-normal">
          Add your private key to the API backend so you can generate minting signatures.
        </p>
        <CodeBlock code={codeBlock3} />
      </section>
    </>
  );
}
