import NextLink from 'next/link';
import { classNames } from '../../utils/classNames';
import useActiveLink from '../../hooks/useActiveLink';

export function NavbarLink({
  href,
  as, // this is the NextLink `as` prop, not the `as` polymorphic prop pattern
  children,
}: {
  href: string;
  as?: string;
  children: React.ReactNode;
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
      >
        {children}
      </NextLink>
    </li>
  );
}

function Navbar() {
  return (
    <ul className="flex items-center justify-start gap-8">
      <NavbarLink href="/buy-me-coffee">Buy My Coffee</NavbarLink>
      <NavbarLink href="/mint">Mint</NavbarLink>
    </ul>
  );
}

export default Navbar;
