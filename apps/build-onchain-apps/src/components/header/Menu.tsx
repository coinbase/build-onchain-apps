import { useCallback, useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { AccountConnectButton } from '../../../onchainKit';
import styles from './Header.module.css';
import Navbar from './Navbar';
import { NavbarMobile } from './NavbarMobile';

function Menu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = useCallback(() => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="flex h-8 items-center justify-start gap-4">
        <NextLink href="/" passHref className="relative h-8 w-8">
          <div className={styles.MenuCircleImage} />
        </NextLink>
        <NextLink
          href="/"
          passHref
          className="font-robotoMono text-center text-xl font-medium text-white"
        >
          BUILD ONCHAIN APPS
        </NextLink>

        <div className="ml-4 flex justify-start md:hidden">
          <button
            type="button"
            aria-label="Menu"
            data-state={isMobileMenuOpen ? 'open' : 'closed'}
            onClick={handleMobileMenuClick}
          >
            <HamburgerMenuIcon width="16" height="16" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start gap-8">
        {isMobileMenuOpen ? <NavbarMobile /> : <Navbar />}
        <AccountConnectButton />
      </div>
    </>
  );
}

export default Menu;
