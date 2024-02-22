import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CodeBlock from '@/components/code-block/CodeBlock';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;
const codeStep2 = `\`\`\`bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE`;
const codeStep3 = `\`\`\`bash
# cd into your new project folder
cd [app-name]/web

# Install dependencies
yarn

# Run onchain app
yarn dev`;
const codeStep4 = `\`\`\`bash
# Install Foundry

curl -L https://foundry.paradigm.xyz | bash
foundryup`;
const codeStep5 = `\`\`\`bash
cd contracts

# Install dependencies
forge install

# Build
forge build`;
const codeStep6 = `\`\`\`bash
# Create a .env file using the .env.example file provided in your contracts folder and add your private key. 
# Make sure to add a 0x in front of your key to convert it to a hex.
# Note: Get an API key from basescan.org for Base Sepolia by creating an account

forge script script/BuyMeACoffee.s.sol:BuyMeACoffeeScript --broadcast --verify --rpc-url base_sepolia
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
      <h3 className="mt-8 scroll-mt-28 text-4xl font-medium text-white" id="get-started">
        Getting started
      </h3>
      <div className="space-between flex gap-8">
        <div className="w-full">
          <hr className="h-px bg-white" />
          <section className="mt-10 flex scroll-mt-28 flex-col" id="step-1">
            <h4 className="text-xl font-normal text-white">Step 1</h4>
            <p className="my-4 text-base font-normal text-zinc-400">Kick off your onchain app</p>
            <CodeBlock code={codeStep1} />
          </section>
          <section className="mt-8 flex scroll-mt-28 flex-col" id="step-2">
            <h4 className="text-xl font-normal text-white">Step 2</h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              Create a <code>.env.local</code> file
            </p>
            <CodeBlock code="cp .env.local.example .env.local" />
            <p className="my-4 text-base font-normal text-zinc-400">
              Obtain Wallet Connect Project ID from{' '}
              <a href="https://walletconnect.com/" target="_blank">
                walletconnect.com
              </a>{' '}
              and assign to the .env.local file
            </p>
            <CodeBlock code={codeStep2} />
          </section>
          <section className="mt-8 flex scroll-mt-28 flex-col" id="step-3">
            <h4 className="text-xl font-normal text-white">Step 3</h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              Install and Run your onchain app
            </p>
            <CodeBlock code={codeStep3} />
          </section>
          <section className="mt-8 flex scroll-mt-28 flex-col" id="step-4">
            <h4 className="text-xl font-normal text-white">Step 4</h4>
            <p className="my-4 text-base font-normal text-zinc-400">Kick start your contracts</p>
            <CodeBlock code={codeStep4} />
          </section>
          <section className="mt-8 flex scroll-mt-28 flex-col" id="step-5">
            <h4 className="text-xl font-normal text-white">Step 5</h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              Build, test and format the sample contracts
            </p>
            <CodeBlock code={codeStep5} />
          </section>
          <section className="mt-8 flex scroll-mt-28 flex-col" id="step-6">
            <h4 className="text-xl font-normal text-white">Step 6</h4>
            <p className="my-4 text-base font-normal text-zinc-400">
              Deploy contracts to Base Sepolia
            </p>
            <CodeBlock code={codeStep6} />
          </section>
        </div>
        <aside className="relative hidden xl:block">
          <nav className="sticky top-28 flex flex-col gap-2 border-s-2 py-2 ps-4">
            <h2 className="text-base font-bold">
              <a href="/#get-started" className="no-underline">
                Getting Started
              </a>
            </h2>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#step-1"
                  data-active={pathname.includes('#step-1')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 1: Kick off your onchain app
                </a>
              </li>
              <li>
                <a
                  href="#step-2"
                  data-active={pathname.includes('#step-2')}
                  className="text-base text-sm font-normal text-zinc-400  no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 2: Create a .env.local file
                </a>
              </li>
              <li>
                <a
                  href="#step-3"
                  data-active={pathname.includes('#step-3')}
                  className="text-base text-sm font-normal text-zinc-400  no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 3: Install and Run your onchain app
                </a>
              </li>
              <li>
                <a
                  href="#step-4"
                  data-active={pathname.includes('#step-4')}
                  className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 4: Kick start your contracts
                </a>
              </li>
              <li>
                <a
                  href="#step-5"
                  data-active={pathname.includes('#step-5')}
                  className="text-base text-sm font-normal text-zinc-400  no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 5: Build the sample contracts
                </a>
              </li>
              <li>
                <a
                  href="#step-6"
                  data-active={pathname.includes('#step-6')}
                  className="text-base text-sm font-normal text-zinc-400  no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
                >
                  Step 6: Deploy contracts to Base Sepolia
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
