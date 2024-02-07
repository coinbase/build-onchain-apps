import { PropsWithChildren } from 'react';
import CodeBlock from '../../components/code-block/CodeBlock';

const codeSnippets = {
  step1: '`npx @coinbase/build-onchain-apps@latest create{:bash}`',
  step2: '`NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=ADD_WALLET_CONNECT_PROJECT_ID_HERE{:bash}`',
  step3: ['```bash', '# Install dependencies', 'yarn', '# Run onchain app', 'yarn dev', '```'].join(
    '\n',
  ),
};

function GuideHeading({ children }: PropsWithChildren) {
  return <h3 className="text-xl font-bold text-white">{children}</h3>;
}

function GuideDescription({ children }: PropsWithChildren) {
  return <p className="font-inter mb-8 mt-1 font-normal leading-7 text-zinc-400">{children}</p>;
}

export default function Guide() {
  return (
    <section className="mb-10 md:mb-20">
      <h2 className="font-inter text-3xl font-medium text-white" id="guide">
        Guide
      </h2>
      <hr className="mb-10 mt-6 border-zinc-400" />
      <div className="flex flex-col gap-20">
        <div>
          <GuideHeading>STEP 1</GuideHeading>
          <GuideDescription>Kick off your onchain app</GuideDescription>
          <CodeBlock code={codeSnippets.step1} />
        </div>
        <div>
          <GuideHeading>STEP 2</GuideHeading>
          <GuideDescription>
            Obtain Wallet Connect Project ID from{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cloud.walletconnect.com/sign-in"
            >
              walletconnect.com
            </a>{' '}
            and assign to the .env.local file
          </GuideDescription>
          <CodeBlock code={codeSnippets.step2} />
        </div>
        <div>
          <GuideHeading>STEP 3</GuideHeading>
          <GuideDescription>Install and Run your onchain app</GuideDescription>
          <CodeBlock code={codeSnippets.step3} />
        </div>
      </div>
    </section>
  );
}
