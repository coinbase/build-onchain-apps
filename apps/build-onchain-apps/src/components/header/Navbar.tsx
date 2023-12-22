import NextLink from 'next/link';
import { classNames } from '../../utils/classNames';
import useActiveLink from '../../hooks/useActiveLink';
import styles from './Header.module.css';

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
        className={classNames(styles.NavigationMenuLink, active ? styles.active : '')}
      >
        {children}
      </NextLink>
    </li>
  );
}

function Navbar() {
  return (
    <ul>
      <NavbarLink href="/">Home</NavbarLink>
      <NavbarLink href="/buy-me-coffee">Buy My Coffee</NavbarLink>
      <NavbarLink href="/mint">Mint</NavbarLink>
    </ul>
  );
}

export default Navbar;
