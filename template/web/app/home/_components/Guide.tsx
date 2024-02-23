import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CodeBlock from '@/components/code-block/CodeBlock';

const codeStep1 = `\`\`\`bash
$ npx @coinbase/build-onchain-apps@latest create`;

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
      <nav className="sticky top-28 flex flex-col gap-2 border-s-2 py-2 ps-4">
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

function H3({ id, children }: { id?: string; children: string }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 text-4xl font-medium text-white">
      {children}
    </h3>
  );
}

function Section({
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
    <section id={id} className="mt-10 flex scroll-mt-28 flex-col">
      <h4 className="text-xl font-normal text-white">{title}</h4>
      <p className="my-4 text-base font-normal text-zinc-400">{subtext}</p>
      {children}
    </section>
  );
}

export default function Guide() {
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
      <H3 id="get-started">Getting started</H3>
      <div className="space-between flex gap-8">
        <div className="w-full">
          <hr className="mt-2 h-px bg-white" />
          {[
            {
              id: 'step-1',
              title: 'Step 1',
              subtext: 'Kick off your onchain app',
              codeBlock: <CodeBlock code={codeStep1} />,
            },
            {
              id: 'step-2',
              title: 'Step 2',
              subtext: 'Install and Run your onchain app',
              codeBlock: <CodeBlock code={codeStep3} />,
            },
            {
              id: 'step-3',
              title: 'Step 3',
              subtext: 'Kick start your contracts',
              codeBlock: <CodeBlock code={codeStep4} />,
            },
            {
              id: 'step-4',
              title: 'Step 4',
              subtext: 'Build, test and format the sample contracts',
              codeBlock: <CodeBlock code={codeStep5} />,
            },
            {
              id: 'step-5',
              title: 'Step 5',
              subtext: 'Deploy contracts to Base Sepolia',
              codeBlock: <CodeBlock code={codeStep6} />,
            },
          ].map(({ id, title, subtext, codeBlock }) => (
            <Section key={id} id={id} title={title} subtext={subtext}>
              {codeBlock}
            </Section>
          ))}
        </div>

        <TableOfContents
          title={{
            href: '/#get-started',
            label: 'Getting Started',
          }}
          contents={[
            {
              href: '#step-1',
              label: 'Step 1: Kick off your onchain app',
            },
            {
              href: '#step-2',
              label: 'Step 2: Install and Run your onchain app',
            },
            {
              href: '#step-3',
              label: 'Step 3: Kick start your contracts',
            },
            {
              href: '#step-4',
              label: 'Step 4: Build the sample contracts',
            },
            {
              href: '#step-5',
              label: 'Step 5: Deploy contracts to Base Sepolia',
            },
          ]}
        />
      </div>
    </>
  );
}
