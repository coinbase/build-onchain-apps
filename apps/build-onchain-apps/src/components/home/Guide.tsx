import CodeBlock from '../CodeBlock/CodeBlock';

export default function Guide() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-medium text-white">Getting started</h3>
      <div className="h-px bg-white" />
      <div className="mt-10 flex lg:flex-row flex-col">
        <div className="flex basis-6/12 flex-col">
          <h4 className="mb-2 text-2xl font-normal text-white">STEP 1</h4>
          <p className="text-xl font-normal text-zinc-400">Kick off your onchain app</p>
        </div>
        <div className="flex basis-6/12 lg:mt-0 mt-4">
          <CodeBlock>
            <span>$</span> <span>npx @coinbase/build-onchain-apps@latest create</span>
          </CodeBlock>
        </div>
      </div>
    </>
  );
}
