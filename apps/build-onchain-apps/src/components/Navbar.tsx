import { Theme } from '@radix-ui/themes';
import {
  Root,
  List,
  Item,
  Link,
  type NavigationMenuLinkProps,
} from '@radix-ui/react-navigation-menu';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { classNames } from '@/utils/classNames';
import { useActiveLink } from '@/hooks/useActiveLink';
import styles from './Navbar.module.css';

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
      <Root className={styles.NavigationMenuRoot}>
        <List className={styles.NavigationMenuList}>{children}</List>
      </Root>
    </Theme>
  );
}
