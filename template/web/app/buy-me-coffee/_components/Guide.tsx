import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CodeBlock from '@/components/code-block/CodeBlock';

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
  const pathname = usePathname();

  useEffect(() => {
    function convertRemToPixels(rem: number) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    function handleScroll() {
      const pageYOffset = window.scrollY;
      let newActiveSectionId = null;

      window.document.querySelectorAll('section[id]').forEach((section) => {
        const sectionOffsetTop = (section as HTMLElement).offsetTop;

        if (pageYOffset >= sectionOffsetTop - convertRemToPixels(7)) {
          newActiveSectionId = section.id;
        }
      });

      window.document
        .querySelectorAll(`aside nav li a[href]`)
        .forEach((linkItem) => linkItem.setAttribute('data-active', 'false'));

      window.document
        .querySelector(`nav li a[href="#${newActiveSectionId}"]`)
        ?.setAttribute('data-active', 'true');
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white" id="guide">
        Guide
      </h3>
      <div className="h-px bg-white" />
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <section className="mt-10 flex scroll-mt-28 flex-col" id="contract-summary">
            <h4 className="text-xl font-normal text-white">Contract Summary</h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              The <code>BuyMeACoffee.sol</code> smart contract allows users to send ETH donations to
              the owner of the contract. Users who donate ETH by buying the owner a contract can
              also submit a message.
            </p>
          </section>
          <section className="mt-10 flex scroll-mt-28 flex-col" id="buyCoffee-explanation">
            <h4 className="text-xl font-normal text-white">
              <code>buyCoffee</code> Explanation
            </h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              <code>buyCoffee</code> is a <code>public payable</code> function that allows a user to
              specify the number of coffees they would like to buy for the owner of the contract.
              This acts as a donation mechanism, where the user supplies enough ETH to cover the
              cost of the number of coffees specified. The contract{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L81-L83"
                target="_blank"
              >
                ensures
              </a>{' '}
              that enough ETH has been provided in the function call.
            </p>
            <CodeBlock code={codeStep1} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              In addition, the user provides their name, twitter handle, and a custom message that
              can be retrieved form the contract to display later. The <code>buyCoffee</code>{' '}
              function ensures that a non-empty name and message{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L87-L89"
                target="_blank"
              >
                have been provided
              </a>
              .
            </p>
            <CodeBlock code={codeStep2} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              There is also a check to make sure the provided name, twitter handle, and message{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L91-L93"
                target="_blank"
              >
                do not exceed
              </a>{' '}
              75 bytes.
            </p>
            <CodeBlock code={codeStep3} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              The message is then instantiated as a <code>Memo</code> struct object, which consists
              of the following{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L27-L34"
                target="_blank"
              >
                fields
              </a>
              :
            </p>
            <CodeBlock code={codeStep4} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              The new <code>Memo</code> struct is then{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L95"
                target="_blank"
              >
                pushed
              </a>{' '}
              into the <code>memos</code> storage variable.
            </p>
            <CodeBlock code={codeStep5} language="solidity" />
          </section>
          <section className="mt-10 flex scroll-mt-28 flex-col" id="getMemos-explanation">
            <h4 className="text-xl font-normal text-white">
              <code>getMemos</code> Explanation
            </h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              <code>getMemos</code> is a <code>public view</code> function that returns an array of{' '}
              <code>Memo</code> elements from the
              <code>memos</code> storage variable. The user provides an index and size parameter,
              which dictate the start position and total number of <code>Memo</code> elements to
              return.
            </p>
            <p className="my-4 text-base font-normal text-zinc-400">
              If the total length of the <code>memos</code> storage variable is 0, then the{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L164"
                target="_blank"
              >
                empty array
              </a>{' '}
              will be returned.
            </p>
            <CodeBlock code={codeStep6} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              If the provided index exceeds the total length of the <code>memos</code> storage
              variable, then the call will{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L168"
                target="_blank"
              >
                revert
              </a>
              . Additionally, if the size specified exceeds 25, the call will
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L172"
                target="_blank"
              >
                revert
              </a>
              .
            </p>
            <CodeBlock code={codeStep7} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              <code>getMemos</code> then calculates the total number of elements that can be
              returned given the index and size, as the requested number of elements may exceeds the
              end of the <code>memos</code>
              array. If that occurs, the total number of elements to return{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L177-L178"
                target="_blank"
              >
                will be truncated
              </a>{' '}
              to the total number of elements remaining in the <code>memos</code> storage variable.
            </p>
            <CodeBlock code={codeStep8} language="solidity" />
            <p className="my-4 text-base font-normal text-zinc-400">
              Once the number of elements to return has been calculated, the function will iterate
              through the <code>memos</code> array,{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L181-L184"
                target="_blank"
              >
                copying elements
              </a>{' '}
              into the temporary memory array. Once the loop has completed, the temporary memory
              array{' '}
              <a
                href="https://github.com/coinbase/build-onchain-apps/blob/v0.21.0/template/contracts/src/BuyMeACoffee.sol#L186"
                target="_blank"
              >
                will be returned
              </a>{' '}
              .
            </p>
            <CodeBlock code={codeStep9} language="solidity" />
          </section>
        </main>
        <aside className="flex-shrink-1 relative mt-10 hidden w-full flex-grow-0 xl:block">
          <nav className="sticky top-28 flex flex-col gap-2 border-s-2 py-2 ps-4">
            <h2 className="text-base font-bold">On this guide</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#contract-summary"
                  data-active={pathname.includes('#contract-summary')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Contract Summary
                </a>
              </li>
              <li>
                <a
                  href="#buyCoffee-explanation"
                  data-active={pathname.includes('#buyCoffee-explanation')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  <code className="text-xs">buyCoffee</code> Explanation
                </a>
              </li>
              <li>
                <a
                  href="#getMemos-explanation"
                  data-active={pathname.includes('#getMemos-explanation')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  <code className="text-xs">getMemos</code> Explanation
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
