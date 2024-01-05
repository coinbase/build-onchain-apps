import { clsx } from 'clsx';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import useActiveLink from '../../hooks/useActiveLink';

export function NavbarLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
}) {
  const active = useActiveLink({ href });
  return (
    <NextLink
      href={href}
      className={clsx(
        'px-[16px] py-[5px] text-center font-robotoMono text-base font-normal text-white',
        active ? 'rounded-[50px] bg-neutral-900 bg-opacity-90' : '',
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
    <li>
      <NavigationMenu.Link asChild>
        <a href={href} className={clsx('ListItemLink')} ref={ref} target={target}>
          {children}
        </a>
      </NavigationMenu.Link>
    </li>
  );
});

function Navbar({ isMenuOpen = false }: { isMenuOpen?: boolean }) {
  return (
    <>
      <ul className="hidden items-center justify-start gap-8 md:flex">
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="16" height="16" />
        </NavbarLink>
        <NavbarLink href="/signature-mint">Signature Mint</NavbarLink>
        <NavbarLink href="/buy-me-coffee">Buy My Coffee</NavbarLink>
        <NavbarLink href="/mint">Mint</NavbarLink>
        <NavigationMenu.Root className="relative">
          <NavigationMenu.List className="flex flex-row space-x-2 rounded-lg bg-white p-2 dark:bg-gray-800">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={clsx(
                  'rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900',
                  'text-sm font-medium',
                  'text-gray-700 dark:text-gray-100',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                )}
              >
                Learn
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={clsx('[animation-duration:250ms] [animation-timing-function:ease]')}
              >
                <ul
                  className={clsx(
                    'm-0 grid grid-cols-[0.75fr_1fr] gap-x-[10px] p-[22px] [list-style:none]',
                  )}
                >
                  <ListItem href="/buy-me-coffee">
                    Buy My Coffee
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator
              className={clsx(
                'z-10',
                'top-[100%] flex h-2 items-end justify-center overflow-hidden',
                'transition-[width_transform] duration-[250ms] ease-[ease]',
              )}
            >
              <div className="relative top-1 h-2 w-2 rotate-45 bg-white dark:bg-gray-800" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className={clsx('absolute flex justify-center', 'left-[-20%] top-[100%] w-[140%]')}>
            <NavigationMenu.Viewport
              className={clsx('relative mt-2 rounded-md bg-gray-800 shadow-lg')}
            />
          </div>
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
