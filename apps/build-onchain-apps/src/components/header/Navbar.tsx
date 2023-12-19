import { Theme } from '@radix-ui/themes';
import {
  Root,
  List,
  Item,
  Link,
  type NavigationMenuLinkProps,
} from '@radix-ui/react-navigation-menu';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { classNames } from '../../utils/classNames';
import useActiveLink from '../../hooks/useActiveLink';
import styles from '../../styles/Navbar.module.css';

export type NavbarLinkProps = Omit<NavigationMenuLinkProps, 'href'> &
  Pick<NextLinkProps, 'href' | 'as' | 'replace' | 'scroll' | 'prefetch' | 'shallow'>;

export function NavbarLink({
  href,
  as, // this is the NextLink `as` prop, not the `as` polymorphic prop pattern
  replace,
  scroll,
  prefetch,
  shallow,
  children,
  ...props
}: NavbarLinkProps) {
  const active = useActiveLink({ href, as });

  return (
    <Item>
      <Link
        asChild
        className={classNames(styles.NavigationMenuLink, active ? styles.active : '')}
        {...props}
      >
        <NextLink
          href={href}
          replace={replace}
          scroll={scroll}
          prefetch={prefetch}
          shallow={shallow}
        >
          {children}
        </NextLink>
      </Link>
    </Item>
  );
}

export type NavbarProps = {
  children: React.ReactElement<NavbarProps> | React.ReactElement<NavbarProps>[];
};

export function Navbar({ children }: NavbarProps) {
  return (
    <Theme asChild className="radix-themes-custom-fonts">
      <div className="w-[1280px] h-16 px-10 py-4 bg-white bg-opacity-10 rounded-[50px] border border-stone-300 backdrop-blur-2xl justify-between items-center inline-flex">
        <div className="h-8 justify-start items-center gap-4 flex">
          <div className="w-8 h-8 relative" />
          <div className="text-center text-white text-xl font-medium font-['Coinbase Mono']">
            BUILD ONCHAIN APPS
          </div>
        </div>
        <div className="justify-start items-center gap-6 flex">
          <div className="text-center text-white text-base font-normal font-['Coinbase Mono']">
            Docs
          </div>
          <div className="text-center text-white text-base font-normal font-['Coinbase Mono']">
            Support us
          </div>
          <div className="w-6 h-6 relative" />
        </div>
      </div>
      <Root className={styles.NavigationMenuRoot}>
        <List className={styles.NavigationMenuList}>{children}</List>
      </Root>
    </Theme>
  );
}

export function DefaultNavbar() {
  return (
    <Navbar>
      <NavbarLink href="/">Home</NavbarLink>
      <NavbarLink href="/buy-me-coffee">Buy My Coffee</NavbarLink>
      <NavbarLink href="/mint">Mint</NavbarLink>
    </Navbar>
  );
}
