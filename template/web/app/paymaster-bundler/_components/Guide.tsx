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
  Ul,
  Li,
  TableOfContents,
} from '@/components/layout/guide';

const signerCodeStep = `\`\`\`javascript
const signer = walletClientToSmartAccountSigner(privyClient);

const simpleSmartAccountClient = await signerToSimpleSmartAccount(publicClient, {
  entryPoint: entryPoint,
  signer: signer,
  factoryAddress: factoryAddress,
});
`;

const customizationStep = `\`\`\`javascript
const data = encodeFunctionData({
  abi: contract.abi,
  functionName: 'mintTo',
  args: [smartAccount.account?.address, randomNumber],
});

await smartAccount.sendTransaction({
  to: contractAddress,
  data: data,
  value: BigInt(0),
  account: smartAccount.account,
  chain: sepolia,
});
`;

export default function Guide() {
  useGuideScroll();

  const contents = useMemo(
    () => [
      {
        href: '#intro',
        label: 'Intro',
      },
      {
        href: '#sign-up',
        label: 'Sign Up For Coinbase Cloud',
      },
      {
        href: '#authentication',
        label: 'Set Up Your Embedded Wallet',
      },
      {
        href: '#customization',
        label: 'Send Your Own Sponsored Transactions',
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
          <Section id="intro">
            <H4>Paymaster & Bundler Experience</H4>
            <P>
              Welcome to the Paymaster & Bundler experience! This guide will help you get started
              with Coinbase Cloud&apos;s Paymaster.
            </P>
            <P>
              If you haven&apos;t done so already, check the{' '}
              <A href="https://buildonchainapps.xyz/">Build Onchain Apps</A> homepage to get the
              repo running locally. You&apos;ll also need to complete the setup steps below to
              render the application locally.
            </P>
          </Section>
          <Section id="sign-up">
            <H4>1. Sign up for Coinbase Cloud and create your Base project</H4>
            <P>
              This example uses Coinbase Cloud&apos;s Paymaster and Bundler to sponsor transactions.
            </P>
            Get started with .25 ETH in free credits:
            <Ul>
              <Li>
                Navigate to the{' '}
                <A href="https://coinbase.com/cloud/products/base/rpc?utm_source=boat">
                  Base Node homepage
                </A>
              </Li>
              <Li>Sign up for a Coinbase Cloud account, if you don&apos;t have one already</Li>
              <Li>
                Create a <p className="inline font-bold">Base</p> project under{' '}
                <p className="inline font-bold"> Start a New Project</p>
              </Li>
              <Ul>
                <Li>
                  Choose <p className="inline font-bold">Sepolia</p> as the network
                </Li>
              </Ul>
              <Li>
                Under Paymaster & Bundler, click <p className="inline font-bold">Activate</p>
              </Li>
              <Ul>
                <Li>This step may take up to 30 seconds to propagate changes</Li>
                <Li>
                  <p className="italic">
                    (Optional) Set a custom gas policy for your project under Manage
                  </p>
                </Li>
              </Ul>
              <Li>
                Copy your RPC URL, and set it as{' '}
                <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_RPC_URL</p> and{' '}
                <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_PAYMASTER_URL</p>{' '}
                in the .env file.
              </Li>
            </Ul>
          </Section>
          <Section id="authentication">
            <H4>2. Set up your embedded wallet & signer</H4>
            <P>
              This example uses Privy embedded wallets for authentication and as a signer for the
              smart contract account.
            </P>
            However, you can use any other embedded wallet or signer.
            <Ul>
              <Li>
                Navigate to <A href="https://www.privy.io/">https://www.privy.io/</A>
              </Li>
              <Li>
                Create an app, copy your app ID, and set it as{' '}
                <p className="inline font-bold text-boat-color-orange">NEXT_PUBLIC_PRIVY_ID</p> in
                the .env file.
              </Li>
              <Li>You can customize the logo and name of your application in the dashboard.</Li>
              <Li>
                To change the signer for the smart contract account, modify these lines in{' '}
                <code>PaymasterBundlerDemo.tsx</code>
              </Li>
              <CodeBlock code={signerCodeStep} language="javascript" />
            </Ul>
          </Section>
          <Section id="customization">
            <H4>3. Send your own sponsored transactions!</H4>
            <Ul>
              <Li>
                Get started by modifying <code>./_contracts</code> and replacing it with the{' '}
                <A href="https://docs.soliditylang.org/en/latest/abi-spec.html">contract ABI</A> of
                your choice.
              </Li>
              <Li>
                In <code>constants.ts</code>, modify the{' '}
                <p className="inline font-bold text-boat-color-orange">contract_address</p>{' '}
                environment variable.
              </Li>
              <Li>
                In the <code>handleOpenBox</code> callback in <code>Gameplay.tsx</code>, you&apos;ll
                want to replace the <code>encodeFunctionData</code> parameters with the ABI,
                function name, and arguments of the contract you&apos;re calling.
              </Li>
              <CodeBlock code={customizationStep} language="javascript" />
              <Li>
                To integrate with other SDKs like Alchemy or Pimlico, refer to the Coinbase Cloud{' '}
                <A href="https://github.com/coinbase/paymaster-bundler-examples">example repo</A>.
              </Li>
            </Ul>
          </Section>
        </main>

        <TableOfContents title="Guide" contents={contents} />
      </div>
    </div>
  );
}
