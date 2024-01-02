import CodeBlock from '../CodeBlock/CodeBlock';

const codeStep1 = `$ npx @coinbase/build-onchain-apps@latest create`;
const codeStep2 = `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE`;

export default function Guide() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white">Getting started</h3>
      <div className="h-px bg-white" />
      <section className="mt-10 flex flex-col">
        <h4 className="mb-2 text-2xl font-normal text-white">STEP 1</h4>
        <p className="text-xl font-normal text-zinc-400">Kick off your onchain app</p>
        <div className="mt-4 flex">
          <CodeBlock code={codeStep1} />
        </div>
      </section>
      <section className="mt-16 flex flex-col">
        <h4 className="mb-2 text-2xl font-normal text-white">STEP 2</h4>
        <p className="text-xl font-normal text-zinc-400">
          Obtain Wallet Connect Project ID from{' '}
          <a href="https://walletconnect.com/" target="_blank">
            walletconnect.com
          </a>
          and assign to the .env.local file
        </p>
        <div className="mt-4 flex">
          <CodeBlock code={codeStep2} />
        </div>
      </section>
    </>
  );
}
