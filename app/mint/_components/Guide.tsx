import { useMemo } from 'react';
import CodeBlock from '@/components/code-block/CodeBlock';
import {
  useGuideScroll,
  P,
  H3,
  H4,
  Section,
  Hr,
  A,
  TableOfContents,
} from '@/components/layout/guide';

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
  useGuideScroll();

  const contents = useMemo(
    () => [
      {
        href: '#contract-summary',
        label: 'Contract Summary',
      },
      {
        href: '#publicMint-explanation',
        label: (
          <>
            <code className="text-xs">publicMint</code> Explanation
          </>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <H3 id="guide">Guide</H3>
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <Hr />
          <Section id="contract-summary">
            <H4>Contract Summary</H4>
            <P>
              The <code>AllowlistNFT.sol</code> smart contract is an extension of an ERC721 smart
              contract. The <A href="https://github.com/chiru-labs/ERC721A">ERC721A</A>{' '}
              implementation is an extension of the{' '}
              <A href="https://eips.ethereum.org/EIPS/eip-721">ERC721 specification</A>, and is
              optimized for gas savings and batch operations.
            </P>
          </Section>
          <Section id="publicMint-explanation">
            <H4>
              <code className="text-xl">publicMint</code> Explanation
            </H4>
            <P>
              The <code>publicMint</code> function allows anyone to mint an NFT from the contract so
              long as the mint is{' '}
              <A href="https://github.com/coinbase/build-onchAin-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L131">
                live
              </A>{' '}
              and the allowlist time period{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L132">
                has elapsed
              </A>
              .
            </P>
            <CodeBlock code={codeStep1} language="solidity" />
            <P>
              The above conditions correspond to the{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L38">
                <code>live</code>
              </A>{' '}
              and{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L42">
                <code>allowlistClose</code>
              </A>{' '}
              variables, respectively. These values are stored as state variables in the contract,
              and are set in the{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L76">
                <code>constructor</code>
              </A>
              .
            </P>
            <P>
              The modifier{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L57">
                <code>whenLive</code>
              </A>{' '}
              is attached to the <code>publicMint</code> function, which checks the value of the{' '}
              <code>live</code> state variable to determine whether to revert the transaction or
              not.
            </P>
            <CodeBlock code={codeStep2} language="solidity" />
            <P>
              The owner of the contract can call the{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L160">
                toggleLive
              </A>{' '}
              function to flip the boolean value of live, thus enabling and disabling minting NFTs.
            </P>
            <P>
              Assuming <code>live</code> is set to true, the <code>publicMint</code> function will
              then ensure that the timestamp of the block being mined is{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L132">
                greater than
              </A>{' '}
              the timestamp stored in <code>allowlistClose</code>. Otherwise, the transaction will
              revert.
            </P>
            <CodeBlock code={codeStep3} language="solidity" />
            <P>
              If the above check succeeds, then the requested number of NFTs to mint will be
              calculated and added to the total number of NFTs the caller (<code>msg.sender</code>)
              has minted previously. If this new total exceeds the maximum allowed NFTs to mint{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L139">
                per-person
              </A>{' '}
              or{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L140">
                globally
              </A>
              , then the transaction will revert.
            </P>
            <CodeBlock code={codeStep4} language="solidity" />
            <P>
              Then, the function will check the supplied amount of ETH (<code>msg.value</code>) to
              ensure that{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L141">
                enough ETH has been provided
              </A>{' '}
              to mint the requested number of NFTs at the current price.
            </P>
            <CodeBlock code={codeStep5} language="solidity" />
            <P>
              Assuming all these checks succeed, <code>publicMint</code> will then{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.18.0/template/contracts/src/AllowlistNFT.sol#L143">
                mint
              </A>{' '}
              the specified amount of NFTs to the caller address.
            </P>
            <CodeBlock code={codeStep6} language="solidity" />
          </Section>
        </main>

        <TableOfContents title="Guide" contents={contents} />
      </div>
    </div>
  );
}
