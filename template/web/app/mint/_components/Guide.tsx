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

const codeStep3 = `\`\`\`solidity
if (block.timestamp < allowlistClose) revert PublicMintNotLive();
`;

const codeStep4 = `\`\`\`solidity
uint256 minted = _numberMinted(msg.sender) + _amount;
if (minted > maxPublicMint) revert MintExceeded();
if (_totalMinted() + _amount > MAX_SUPPLY) revert SupplyExceeded();
`;

const codeStep5 = `\`\`\`solidity
if (msg.value != _amount * price) revert InsufficientPayment();
`;

const codeStep6 = `\`\`\`solidity
_mint(msg.sender, _amount);
`;

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
              long as the mint is{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L131"
                target="_blank"
              >
                live
              </a>{' '}
              and the allowlist time period{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L132"
                target="_blank"
              >
                has elapsed
              </a>
              .
            </p>
            <CodeBlock code={codeStep1} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              The above conditions correspond to the{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L38"
                target="_blank"
              >
                <code>live</code>
              </a>{' '}
              and{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L42"
                target="_blank"
              >
                <code>allowlistClose</code>
              </a>{' '}
              variables, respectively. These values are stored as state variables in the contract,
              and are set in the{' '}
              <a href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L76">
                <code>constructor</code>
              </a>
              .
            </p>
            <p className="my-4 text-base font-normal text-zinc-400">
              The modifier{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L57"
                target="_blank"
              >
                <code>whenLive</code>
              </a>{' '}
              is attached to the <code>publicMint</code> function, which checks the value of the{' '}
              <code>live</code> state variable to determine whether to revert the transaction or
              not.
            </p>
            <CodeBlock code={codeStep2} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              The owner of the contract can call the{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L160"
                target="_blank"
              >
                toggleLive
              </a>{' '}
              function to flip the boolean value of live, thus enabling and disabling minting NFTs.
            </p>
            <p className="my-4 text-base font-normal text-zinc-400">
              Assuming <code>live</code> is set to true, the <code>publicMint</code> function will
              then ensure that the timestamp of the block being mined is{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L132"
                target="_blank"
              >
                greater than
              </a>{' '}
              the timestamp stored in <code>allowlistClose</code>. Otherwise, the transaction will
              revert.
            </p>
            <CodeBlock code={codeStep3} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              If the above check succeeds, then the requested number of NFTs to mint will be
              calculated and added to the total number of NFTs the caller (<code>msg.sender</code>)
              has minted previously. If this new total exceeds the maximum allowed NFTs to mint{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L139"
                target="_blank"
              >
                per-person
              </a>{' '}
              or{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L140"
                target="_blank"
              >
                globally
              </a>
              , then the transaction will revert.
            </p>
            <CodeBlock code={codeStep4} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              Then, the function will check the supplied amount of ETH (<code>msg.value</code>) to
              ensure that{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L141"
                target="_blank"
              >
                enough ETH has been provided
              </a>{' '}
              to mint the requested number of NFTs at the current price.
            </p>
            <CodeBlock code={codeStep5} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              Assuming all these checks succeed, <code>publicMint</code> will then{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L143"
                target="_blank"
              >
                mint
              </a>{' '}
              the specified amount of NFTs to the caller address.
            </p>
            <CodeBlock code={codeStep6} language="solidity" />
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
