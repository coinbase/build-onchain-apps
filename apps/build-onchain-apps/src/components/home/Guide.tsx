import CodeBlock from '../CodeBlock';

export default function Guide() {
  return (
    <div>
      <div className="h-20">
        <h3 className="text-4xl font-medium text-white mb-6">Getting started</h3>
        <div className="h-px bg-white" />
      </div>
      <div>
        <CodeBlock>
          <span>$</span> <span>npx @coinbase/build-onchain-apps@latest create</span>
        </CodeBlock>
      </div>
    </div>
  );
}
