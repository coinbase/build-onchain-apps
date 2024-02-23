import CodeBlock from '@/components/code-block/CodeBlock';
import { useGuideScroll, P, H3, H4, Section, Hr, TableOfContents } from '@/components/layout/guide';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;

const codeStep3 = `\`\`\`bash
# Install dependencies
yarn

# Run onchain app
yarn dev`;

function GuideSection({
  id,
  title,
  subtext,
  children,
}: {
  id: string;
  title: string;
  subtext: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={id}>
      <H4>{title}</H4>
      <P>{subtext}</P>
      {children}
    </Section>
  );
}

const tocContent = [
  {
    href: '#step-1',
    label: 'Step 1: Create your onchain app',
  },
  {
    href: '#step-2',
    label: 'Step 2: Run your onchain app',
  },
];

export default function Guide() {
  useGuideScroll();

  return (
    <>
      <H3 id="get-started">Getting started</H3>
      <div className="gap-16 lg:flex">
        <main className="w-full flex-shrink-0 flex-grow xl:max-w-[900px]">
          <Hr />
          {[
            {
              id: 'step-1',
              title: 'Step 1',
              subtext: 'Create your onchain app',
              codeBlock: <CodeBlock code={codeStep1} />,
            },
            {
              id: 'step-2',
              title: 'Step 2',
              subtext: 'Run your onchain app',
              codeBlock: <CodeBlock code={codeStep3} />,
            },
          ].map(({ id, title, subtext, codeBlock }) => (
            <GuideSection key={id} id={id} title={title} subtext={subtext}>
              {codeBlock}
            </GuideSection>
          ))}
        </main>

        <TableOfContents title="Getting Started" contents={tocContent} />
      </div>
    </>
  );
}
