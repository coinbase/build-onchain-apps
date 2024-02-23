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
if (msg.value < price * numCoffees) {
  revert InsufficientFunds();
}`;

const codeStep2 = `\`\`\`solidity
if (bytes(userName).length == 0 && bytes(message).length == 0) {
  revert InvalidArguments("Invalid userName or message");
}`;

const codeStep3 = `\`\`\`solidity
if (bytes(userName).length > 75 || bytes(twitterHandle).length > 75 || bytes(message).length > 1024) {
  revert InvalidArguments("Input parameter exceeds max length");
}
`;

const codeStep4 = `\`\`\`solidity
struct Memo {
  uint256 numCoffees;
  string userName;
  string twitterHandle;
  string message;
  uint256 time;
  address userAddress;
}
`;

const codeStep5 = `\`\`\`solidity
memos.push(Memo(numCoffees, userName, twitterHandle, message, block.timestamp, msg.sender));
`;

const codeStep6 = `\`\`\`solidity
if (memos.length == 0) {
  return memos;
}
`;

const codeStep7 = `\`\`\`solidity
if (index >= memos.length) {
  revert InvalidArguments("Invalid index");
}

if (size > 25) {
  revert InvalidArguments("size must be <= 25");
}
`;

const codeStep8 = `\`\`\`solidity
uint256 effectiveSize = size;
if (index + size > memos.length) {
    // Adjust the size if it exceeds the array's bounds
    effectiveSize = memos.length - index;
}
`;

const codeStep9 = `\`\`\`solidity
Memo[] memory slice = new Memo[](effectiveSize);
for (uint256 i = 0; i < effectiveSize; i++) {
    slice[i] = memos[index + i];
}

return slice;
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
        href: '#buyCoffee-explanation',
        label: (
          <>
            <code className="text-xs">buyCoffee</code> Explanation
          </>
        ),
      },
      {
        href: '#getMemos-explanation',
        label: (
          <>
            <code className="text-xs">getMemos</code> Explanation
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
              The <code>BuyMeACoffee.sol</code> smart contract allows users to send ETH donations to
              the owner of the contract. Users who donate ETH by buying the owner a contract can
              also submit a message.
            </P>
          </Section>
          <Section id="buyCoffee-explanation">
            <H4>
              <code className="text-xl">buyCoffee</code> Explanation
            </H4>
            <P>
              <code>buyCoffee</code> is a <code>public payable</code> function that allows a user to
              specify the number of coffees they would like to buy for the owner of the contract.
              This acts as a donation mechanism, where the user supplies enough ETH to cover the
              cost of the number of coffees specified. The contract{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L81-L83">
                ensures
              </A>{' '}
              that enough ETH has been provided in the function call.
            </P>
            <CodeBlock code={codeStep1} language="solidity" />
            <P>
              In addition, the user provides their name, twitter handle, and a custom message that
              can be retrieved form the contract to display later. The <code>buyCoffee</code>{' '}
              function ensures that a non-empty name and message{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L87-L89">
                have been provided
              </A>
              .
            </P>
            <CodeBlock code={codeStep2} language="solidity" />
            <P>
              There is also a check to make sure the provided name, twitter handle, and message{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L91-L93">
                do not exceed
              </A>{' '}
              75 bytes.
            </P>
            <CodeBlock code={codeStep3} language="solidity" />
            <P>
              The message is then instantiated as a <code>Memo</code> struct object, which consists
              of the following{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L27-L34">
                fields
              </A>
              :
            </P>
            <CodeBlock code={codeStep4} language="solidity" />
            <P>
              The new <code>Memo</code> struct is then{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L95">
                pushed
              </A>{' '}
              into the <code>memos</code> storage variable.
            </P>
            <CodeBlock code={codeStep5} language="solidity" />
          </Section>
          <Section id="getMemos-explanation">
            <H4>
              <code className="text-xl">getMemos</code> Explanation
            </H4>
            <P>
              <code>getMemos</code> is a <code>public view</code> function that returns an array of{' '}
              <code>Memo</code> elements from the
              <code>memos</code> storage variable. The user provides an index and size parameter,
              which dictate the start position and total number of <code>Memo</code> elements to
              return.
            </P>
            <P>
              If the total length of the <code>memos</code> storage variable is 0, then the{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L164">
                empty array
              </A>{' '}
              will be returned.
            </P>
            <CodeBlock code={codeStep6} language="solidity" />
            <P>
              If the provided index exceeds the total length of the <code>memos</code> storage
              variable, then the call will{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L168">
                revert
              </A>
              . Additionally, if the size specified exceeds 25, the call will
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L172">
                revert
              </A>
              .
            </P>
            <CodeBlock code={codeStep7} language="solidity" />
            <P>
              <code>getMemos</code> then calculates the total number of elements that can be
              returned given the index and size, as the requested number of elements may exceeds the
              end of the <code>memos</code>
              array. If that occurs, the total number of elements to return{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L177-L178">
                will be truncated
              </A>{' '}
              to the total number of elements remaining in the <code>memos</code> storage variable.
            </P>
            <CodeBlock code={codeStep8} language="solidity" />
            <P>
              Once the number of elements to return has been calculated, the function will iterate
              through the <code>memos</code> array,{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L181-L184">
                copying elements
              </A>{' '}
              into the temporary memory array. Once the loop has completed, the temporary memory
              array{' '}
              <A href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L186">
                will be returned
              </A>{' '}
              .
            </P>
            <CodeBlock code={codeStep9} language="solidity" />
          </Section>
        </main>
        <TableOfContents title="Guide" contents={contents} />
      </div>
    </div>
  );
}
