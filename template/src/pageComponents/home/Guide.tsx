import CodeBlock from '../../components/code-block/CodeBlock';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;
const codeStep2 = `\`\`\`bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE`;
const codeStep3 = `\`\`\`bash
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
# Create a .env file using the .env.example file provided in your contracts folder and add your private key. Make sure to add a 0x in front of your key to convert it to a hex.
# Note: Get an API key from basescan.org for Base Sepolia by creating an account

forge script script/BuyMeACoffee.s.sol:BuyMeACoffeeScript --broadcast --verify --rpc-url base_sepolia
`;

export default function Guide() {
  return (
    <>
      <h3 className="mt-8 text-4xl font-medium text-white" id="get-started">
        Getting started
      </h3>
      <div className="h-px bg-white" />
      <section className="mt-10 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 1</h4>
        <p className="my-4 text-base font-normal text-zinc-400">Kick off your onchain app</p>
        <CodeBlock code={codeStep1} />
      </section>
      <section className="mt-8 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 2</h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          Create a <code>.env.local</code> file
        </p>
        <CodeBlock code="cp .env.local.default .env.local" />
        <p className="my-4 text-base font-normal text-zinc-400">
          Obtain Wallet Connect Project ID from{' '}
          <a href="https://walletconnect.com/" target="_blank">
            walletconnect.com
          </a>{' '}
          and assign to the .env.local file
        </p>
        <CodeBlock code={codeStep2} />
      </section>
      <section className="mt-8 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 3</h4>
        <p className="my-4 text-base font-normal text-zinc-400">Install and Run your onchain app</p>
        <CodeBlock code={codeStep3} />
      </section>
      <section className="mt-8 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 4</h4>
        <p className="my-4 text-base font-normal text-zinc-400">Kick start your contracts</p>
        <CodeBlock code={codeStep4} />
      </section>
      <section className="mt-8 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 5</h4>
        <p className="my-4 text-base font-normal text-zinc-400">
          Build, test and format the sample contracts
        </p>
        <CodeBlock code={codeStep5} />
      </section>
      <section className="mt-8 flex flex-col">
        <h4 className="text-xl font-normal text-white">Step 6</h4>
        <p className="my-4 text-base font-normal text-zinc-400">Deploy contracts to Base Sepolia</p>
        <CodeBlock code={codeStep6} />
      </section>
    </>
  );
}
