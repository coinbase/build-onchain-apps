import { useCallback, useMemo, useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AccountConnect from './AccountConnect';
import Navbar from './Navbar';
import { NavbarMobile } from './NavbarMobile';

function Menu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(width <= 768px)');

  const handleMobileMenuClick = useCallback(() => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const MenuTitle = useMemo(() => {
    return isSmallScreen ? 'BOAT' : 'BUILD ONCHAIN APPS';
  }, [isSmallScreen]);

  return (
    <>
      <div className="flex h-8 items-center justify-start gap-4">
        <NextLink href="/" passHref className="relative h-8 w-8">
          <div className="absolute size-8 rounded-full bg-white" />
        </NextLink>
        <div className="flex justify-start md:hidden">
          <button
            type="button"
            aria-label="Menu"
            data-state={isMobileMenuOpen ? 'open' : 'closed'}
            onClick={handleMobileMenuClick}
          >
            <HamburgerMenuIcon width="16" height="16" />
          </button>
        </div>
        <NextLink
          href="/"
          passHref
          className="font-robotoMono text-center text-xl font-medium text-white no-underline"
        >
          {MenuTitle}
        </NextLink>
      </div>

      <div className="flex items-center justify-start gap-8">
        {isMobileMenuOpen ? <NavbarMobile /> : <Navbar />}
        <AccountConnect />
      </div>
    </>
  );
}

export default Menu;
