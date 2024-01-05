import Image from 'next/image';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import { baseGoerli, Chain } from 'viem/chains';
import { parseEther } from 'viem';
import { useCallback, useEffect, useState } from 'react';
import { contract } from '../../contract/ContractSpecification';
import useCollectionMetadata from '../../hooks/useCollectionMetadata';
import CodeBlock from '../CodeBlock/CodeBlock';
import { useDebounce } from '../../hooks/useDebounce';
import useBlockExplorerLink from '../../hooks/useBlockExplorerLink';
import NotConnected from './NotConnected';
import SwitchNetwork from './SwitchNetwork';

const EXPECTED_CHAIN = baseGoerli;

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
  /**
   * Per Wagmi, we should debounce dynamic parameters
   * https://wagmi.sh/examples/contract-write-dynamic
   */
  const debouncedSigValue = useDebounce<string>(signature, 500);
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  const contractAddress = contract.signatureMint721[baseGoerli.id].address;
  const explorerLink = useBlockExplorerLink(chain as Chain, contractAddress);
  const [usedFreeMint, setUsedFreeMint] = useState(false);

  const { collectionName, imageAddress, isLoading } = useCollectionMetadata(
    onCorrectNetwork,
    contractAddress,
    contract.signatureMint721.abi,
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
    address: contract.signatureMint721[baseGoerli.id].address,
    abi: contract.signatureMint721.abi,
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
    address: contract.signatureMint721[baseGoerli.id].address,
    abi: contract.signatureMint721.abi,
    functionName: 'mint',
    args: [address],
    value: parseEther('0.0001'), // You should read the contract, however, setting this to value to prevent abuse.
  });
  const { write: paidMint } = useContractWrite(paidMintConfig);

  const usedFreeMintResponse = useContractRead({
    // TODO: the chainId should be dynamic
    address: contract.signatureMint721[baseGoerli.id].address,
    abi: contract.signatureMint721.abi,
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
      <h3 className="mb-6 text-4xl font-medium text-white">Signature Mint Contract</h3>
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
                <button
                  type="button"
                  onClick={paidMint}
                  className="focus:shadow-outline ml-3 rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
                >
                  Paid Mint
                </button>
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

      <h3 className="mb-6 mt-6 text-4xl font-medium text-white">Getting started</h3>
      <div className="h-px bg-white" />
      <section className="mb-6 mt-10 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 1 : Create Signer</h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          1. Create a wallet that will act as your signer on your backend. You can use wallets like
          Coinbase, Metamask assuming you can export the private key. As a best practice avoid
          reusing private keys for multiple thing & do not store funds in this wallet. Also, you can
          use popular library like Ethers to
        </p>
        <CodeBlock code={codeBlock1} />
        2. Next add that wallet to the contracts project environment file
        <CodeBlock code={codeBlock2} />
        <h4 className="mb-6 mt-6 text-xl font-normal text-white">Step 2 : Deploy Contract</h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          Deploy the contract to base-sepolia
        </p>
        <CodeBlock
          code="
          forge script script/SignatureMintERC721.s.sol:SignatureMintERC721Script --broadcast --verify --rpc-url ${RPC_URL} --etherscan-api-key ${BLOCK_EXPLORER_API_KEY}
        "
        />
        <h4 className="mb-6 mt-6 text-xl font-normal text-white">
          Step 3 : Add Private Key to backend
        </h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          Add your private key to the API backend so you can generate minting signatures.
        </p>
        <CodeBlock code={codeBlock3} />
      </section>
    </>
  );
}
