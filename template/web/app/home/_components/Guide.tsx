import { usePathname } from 'next/navigation';
import CodeBlock from '@/components/code-block/CodeBlock';
import { useGuideScroll, P, H3, H4, Section, Hr } from '@/components/layout/guide';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;

const codeStep3 = `\`\`\`bash
# Install dependencies
yarn

# Run onchain app
yarn dev`;

type TableOfContentsProps = {
  title: {
    href: string;
    label: string;
  };
  contents: {
    href: string;
    label: string;
  }[];
};

function TableOfContents({ title, contents }: TableOfContentsProps) {
  const pathname = usePathname();
  return (
    <aside className="relative hidden xl:block">
      <nav className="sticky top-28 flex flex-col gap-2 border-s border-gray-500 py-2 ps-4">
        <h2 className="text-base font-bold">
          <a href={title.href} className="no-underline">
            {title.label}
          </a>
        </h2>
        <ul className="flex flex-col gap-2">
          {contents.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                data-active={pathname.includes(href)}
                className="text-base text-sm font-normal text-zinc-400 no-underline underline-offset-2 hover:underline data-[active=true]:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

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
      <div className="space-between flex gap-8">
        <div className="w-full">
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
        </div>

        <TableOfContents
          title={{
            href: '#get-started',
            label: 'Getting Started',
          }}
          contents={tocContent}
        />
      </div>
    </>
  );
}
