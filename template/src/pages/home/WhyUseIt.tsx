import { CheckIcon } from '@radix-ui/react-icons';

export default function HomeMain() {
  return (
    <section className="mb-24 flex flex-col items-center justify-center">
      <div className="w-full md:w-4/5">
        <h2 className="mb-14 text-center text-xl font-medium text-white md:text-2xl lg:text-3xl">
          Save weeks of initial dApp setup and the hassle of integrating web3 components with web2
          infrastructure.
        </h2>
        <ul className="items-left flex flex-col justify-center">
          <li className="inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Progressive Web App support using{' '}
              <a href="https://nextjs.org/" target="_blank">
                Next.js
              </a>{' '}
              🏗️
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Eth L2 support through{' '}
              <a href="https://base.org/" target="_blank">
                Base
              </a>{' '}
              🔵
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Wallet connect integration with{' '}
              <a href="https://www.rainbowkit.com/" target="_blank">
                RainbowKit
              </a>{' '}
              🌈
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Live examples and documentation for web3 experiences with{' '}
              <a href="https://wagmi.sh/" target="_blank">
                wagmi
              </a>{' '}
              and{' '}
              <a href="https://viem.sh/" target="_blank">
                viem
              </a>{' '}
              🚀
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Latest styling best practices with{' '}
              <a href="https://tailwindcss.com/" target="_blank">
                Tailwind CSS
              </a>{' '}
              💅
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Easy maintenance with linting, formatting, and tests ✅
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Smart contract deployment with Foundry ☁️
            </span>
          </li>
          <li className="mt-5 inline-flex items-center justify-start gap-4">
            <CheckIcon width="24" height="24" />
            <span className="font-inter text-xl font-normal leading-7 text-white">
              Insights into Web Vitals performance metrics with Perfume.js 📈
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
