import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
      <hr className="h-px bg-white" />
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <section className="mt-10 flex scroll-mt-28 flex-col" id="contract-summary">
            <h4 className="text-xl font-normal text-white">Contract Summary</h4>
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
          <section className="mt-10 flex scroll-mt-28 flex-col" id="publicMint-explanation">
            <h4 className="text-xl font-normal text-white">
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
                  href="#publicMint-explanation"
                  data-active={pathname.includes('#publicMint-explanation')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  <code className="text-xs">publicMint</code> Explanation
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
