import { forwardRef } from 'react';
import { ChevronDownIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import NextLink from 'next/link';

export function NavbarLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal text-white no-underline"
      target={target}
    >
      {children}
    </NextLink>
  );
}

const ListItem = forwardRef(function ListItem(
  {
    children,
    target,
    href,
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
  },
  ref: React.Ref<HTMLAnchorElement>,
) {
  return (
    <div className="inline-flex items-center justify-start gap-8">
      <NavigationMenu.Link asChild className="flex items-center justify-start gap-1">
        <a
          href={href}
          className={clsx('font-robotoMono text-base font-normal text-white no-underline')}
          ref={ref}
          target={target}
        >
          {children}
        </a>
      </NavigationMenu.Link>
    </div>
  );
});

function Navbar() {
  return (
    <ul className="hidden items-center justify-start gap-8 md:flex">
      <li className="flex">
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="24" height="24" />
        </NavbarLink>
      </li>
      <li className="flex">
        <NavbarLink href="/#get-started">Get Started</NavbarLink>
      </li>
      <li className="flex">
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className={clsx('flex flex-row space-x-2')}>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex items-center justify-start gap-1">
                <span className="font-robotoMono text-center text-base font-normal text-white">
                  Experiences
                </span>
                <ChevronDownIcon
                  className="transform transition duration-200 ease-in-out group-data-[state=open]:rotate-180"
                  width="16"
                  height="16"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={clsx(
                  'h-38 inline-flex w-48 flex-col items-start justify-start gap-6',
                  'rounded-lg bg-neutral-900 bg-opacity-90 p-6 shadow backdrop-blur-2xl',
                )}
              >
                <ListItem href="/buy-me-coffee">Buy Me Coffee</ListItem>
                <ListItem href="/mint">Mint NFT</ListItem>
                <ListItem href="/signature-mint">Signature Mint</ListItem>
                <ListItem href="/frame">Frame</ListItem>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport
            className={clsx('absolute flex justify-center', 'left-[-20%] top-[100%] w-[140%]')}
          />
        </NavigationMenu.Root>
      </li>
    </ul>
  );
}

export default Navbar;
