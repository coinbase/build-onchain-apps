import { forwardRef } from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
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
      className={clsx(
        'px-[16px] py-[5px]',
        'text-center font-robotoMono text-base font-normal text-white',
      )}
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
          className={clsx('text-center font-robotoMono text-base font-normal text-white')}
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
      <li>
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="16" height="16" />
        </NavbarLink>
      </li>
      <li>
        <NavbarLink href="/#get-started">Get Started</NavbarLink>
      </li>
      <li>
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className={clsx('flex flex-row space-x-2 p-2')}>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={clsx(
                  'px-[16px] py-[5px]',
                  'text-center font-robotoMono text-base font-normal text-white',
                )}
              >
                Experiences
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={clsx(
                  'h-38 inline-flex w-48 flex-col items-start justify-start gap-6',
                  'rounded-lg bg-neutral-900 bg-opacity-90 p-6 shadow backdrop-blur-2xl',
                )}
              >
                <ListItem href="/buy-me-coffee">Buy My Coffee</ListItem>
                <ListItem href="/mint">Mint NFT</ListItem>
                <ListItem href="/signature-mint">Signature Mint</ListItem>
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
