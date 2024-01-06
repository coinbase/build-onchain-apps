import { clsx } from 'clsx';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

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

function Navbar({ isMenuOpen = false }: { isMenuOpen?: boolean }) {
  return (
    <>
      <ul className="hidden items-center justify-start gap-8 md:flex">
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="16" height="16" />
        </NavbarLink>
        <NavbarLink href="/#get-started">Get Started</NavbarLink>
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
                  'inline-flex h-38 w-48 flex-col items-start justify-start gap-6',
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
      </ul>
      {isMenuOpen && (
        <div>
          <RemoveScroll allowPinchZoom enabled>
            Ciao
          </RemoveScroll>
        </div>
      )}
    </>
  );
}

export default Navbar;
