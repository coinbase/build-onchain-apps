import CodeBlock from '../../components/code-block/CodeBlock';

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
SIGNATURE_MINT_PRIVATE_KEY="WalletPrivateKey"
`;

const codeBlock4 = `curl 'http://localhost:3000/api/mint/signature/free?chainId=84532&wallet=0xWALLET_ADDRESS'`;

export default function Guide() {
  return (
    <>
      <h3 className="mb-6 mt-6 text-4xl font-medium text-white" id="guide">
        Guide
      </h3>
      <div className="h-px bg-white" />
      <section className="mb-6 mt-10 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 1 : Create Signer</h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          1. Create a wallet that will act as your signer on your backend. You can use wallets like
          Coinbase, Metamask assuming you can export the private key. As a best practice avoid
          reusing private keys for multiple thing & do not store funds in this wallet. Also, you can
          use popular library like Ethers to generate a wallet:
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
          forge script script/SignatureMintERC721.s.sol:SignatureMintERC721Script --broadcast --verify --rpc-url base_sepolia
        "
        />
        <h4 className="mb-6 mt-6 text-xl font-normal text-white">
          Step 3 : Add Private Key to frontend project
        </h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          Add your private key to the API backend so you can generate minting signatures.
        </p>
        <CodeBlock code={codeBlock3} />
        <h4 className="mb-6 mt-6 text-xl font-normal text-white">
          Step 4 : Call the backend to get your signature
        </h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          After you add your key to the backend you can call an API route to generate a signature
          for a specified wallet. That signature can be used to mint a NFT for free against the
          contract.
        </p>
        <CodeBlock code={codeBlock4} />
      </section>
    </>
  );
}
