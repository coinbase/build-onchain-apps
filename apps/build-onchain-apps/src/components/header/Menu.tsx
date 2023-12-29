import { useState } from 'react';
import { IconButton } from '@radix-ui/themes';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { AccountConnectButton } from '../../onchain';
import styles from './Header.module.css';
import Navbar from './Navbar';

function Menu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMobileMenuClick = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <div className="flex h-8 items-center justify-start gap-4">
        <NextLink href="/" passHref className="relative h-8 w-8">
          <div className={styles.MenuCircleImage} />
        </NextLink>
        <NextLink href="/" passHref className="text-center text-xl font-medium text-white">
          BUILD ONCHAIN APPS
        </NextLink>

        <div className="flex sm:hidden">
          <IconButton
            size="3"
            variant="ghost"
            color="gray"
            data-state={isMenuOpen ? 'open' : 'closed'}
            onClick={handleMobileMenuClick}
          >
            <HamburgerMenuIcon width="16" height="16" />
          </IconButton>
        </div>
      </div>

      <div className="flex items-center justify-start gap-8">
        <Navbar isMenuOpen={isMenuOpen} />
        <AccountConnectButton />
      </div>
    </>
  );
}

export default Menu;
