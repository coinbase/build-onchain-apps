import NextLink from 'next/link';
import { RemoveScroll } from 'react-remove-scroll';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { classNames } from '../../utils/classNames';
import useActiveLink from '../../hooks/useActiveLink';

export function NavbarLink({
  href,
  as, // this is the NextLink `as` prop, not the `as` polymorphic prop pattern
  children,
  target,
}: {
  href: string;
  as?: string;
  children: React.ReactNode;
  target?: string;
}) {
  const active = useActiveLink({ href, as });
  return (
    <li>
      <NextLink
        href={href}
        className={classNames(
          'px-[16px] py-[5px] text-center text-base font-normal text-white',
          active ? 'rounded-[50px] bg-neutral-900 bg-opacity-90' : '',
        )}
        target={target}
      >
        {children}
      </NextLink>
    </li>
  );
}

function Navbar({ isMenuOpen = false }: { isMenuOpen?: boolean }) {
  return (
    <>
      <ul className="hidden items-center justify-start gap-8 md:flex">
        <NavbarLink href="/buy-me-coffee">Buy My Coffee</NavbarLink>
        <NavbarLink href="/mint">Mint</NavbarLink>
        <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
          <GitHubLogoIcon width="16" height="16" />
        </NavbarLink>
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
