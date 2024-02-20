import CodeBlock from '@/components/code-block/CodeBlock';

const codeStep1 = `\`\`\`solidity
function publicMint(uint256 _amount) external payable whenLive {
  if (block.timestamp < allowlistClose) revert PublicMintNotLive();
  ...
}`;

const codeStep2 = `\`\`\`solidity
modifier whenLive() {
    if (!live) revert MintNotLive();
    _;
}`;

export default function Guide() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white" id="guide">
        Guide
      </h3>
      <div className="h-px bg-white" />
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <section className="mt-10 flex flex-col">
            <h4 className="text-xl font-normal text-white" id="contract-summary">
              Contract Summary
            </h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              The <code>AllowlistNFT.sol</code> smart contract is an extension of an ERC721 smart
              contract. The{' '}
              <a href="https://github.com/chiru-labs/ERC721A" target="_blank">
                ERC721A
              </a>{' '}
              implementation is an extension of the{' '}
              <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank">
                ERC721 specification
              </a>
              , and is optimized for gas savings and batch operations.
            </p>
          </section>
          <section className="mt-10 flex flex-col">
            <h4 className="text-xl font-normal text-white" id="publicMint-explanation">
              <code>publicMint</code> Explanation
            </h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              The <code>publicMint</code> function allows anyone to mint an NFT from the contract so
              long as the mint is live and the allowlist time period has elapsed.
            </p>
            <CodeBlock code={codeStep1} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              The above conditions correspond to the live and <code>allowlistClose</code> variables,
              respectively. These values are stored as state variables in the contract, and are set
              in the <code>constructor</code>.
            </p>
            <p className="my-4 text-base font-normal text-zinc-400">
              The modifier <code>whenLive</code> is attached to the <code>publicMint</code>{' '}
              function, which checks the value of the <code>live</code> state variable to determine
              whether to revert the transaction or not.
            </p>
            <CodeBlock code={codeStep2} language="solidity" />
          </section>
        </main>
        <aside className="flex-shrink-1 mt-10 hidden w-full flex-grow-0 xl:block">
          <nav>
            <h2>On this page</h2>
            <ul>
              <li>
                <a href="/mint#contract-summary">Contract Summary</a>
              </li>
              <li>
                <a href="/mint#publicMint-explanation">publicMint explanation</a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
