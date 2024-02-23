import { CheckIcon } from '@radix-ui/react-icons';

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center justify-start gap-4">
      <CheckIcon width="24" height="24" />
      <span className="font-inter text-xl font-normal leading-7 text-white">{children}</span>
    </li>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" className="text-blue-500 no-underline">
      {children}
    </a>
  );
}

export default function HomeMain() {
  return (
    <section className="mb-12 flex flex-col items-center justify-center">
      <div className="w-full md:w-4/5">
        <h2 className="mb-10 text-center text-xl font-medium text-white md:text-2xl lg:text-3xl">
          Save weeks of initial app setup and the hassle of integrating onchain components with web2
          infrastructure.
        </h2>
        <ul className="items-left flex flex-col justify-center gap-4">
          <ListItem>
            Progressive Web App support using <A href="https://nextjs.org/">Next.js</A> 🏗️
          </ListItem>
          <ListItem>
            Eth L2 support through <A href="https://base.org/">Base</A> 🔵
          </ListItem>
          <ListItem>
            Smart contract deployment with <A href="https://book.getfoundry.sh/">Foundry</A> ☁️
          </ListItem>
          <ListItem>
            Support for a local testnet node for testing smart contracts using{' '}
            <A href="https://book.getfoundry.sh/reference/anvil/">Anvil</A> 🧪
          </ListItem>
          <ListItem>
            Wallet connect integration with <A href="https://www.rainbowkit.com/">RainbowKit</A> 🌈
          </ListItem>
          <ListItem>
            Live examples and documentation for web3 experiences with{' '}
            <A href="https://wagmi.sh/">wagmi</A> and <A href="https://viem.sh/">viem</A> 🚀
          </ListItem>
          <ListItem>
            Latest styling best practices with <A href="https://tailwindcss.com/">Tailwind CSS</A>{' '}
            💅
          </ListItem>
          <ListItem>
            Insights into Web Vitals performance metrics with{' '}
            <A href="https://zizzamia.github.io/perfume/">Perfume.js</A>
          </ListItem>
          <ListItem>Easy maintenance with linting, formatting, and tests ✅</ListItem>
        </ul>
      </div>
    </section>
  );
}
