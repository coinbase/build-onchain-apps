import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { AccountConnectButton } from '../../onchain';
import styles from './Header.module.css';
import Navbar from './Navbar';
import { useMobileMenuContext } from './MobileMenu';

function Menu() {
  const mobileMenu = useMobileMenuContext();

  const handleMobileMenuClick = useCallback(() => {
    mobileMenu.setOpen((open) => !open);
  }, [mobileMenu]);

  return (
    <>
      <div className="flex h-8 items-center justify-start gap-4">
        <NextLink href="/" passHref className="relative h-8 w-8">
          <div className={styles.MenuCircleImage} />
        </NextLink>
        <NextLink href="/" passHref className="text-center text-xl font-medium text-white">
          BUILD ONCHAIN APPS
        </NextLink>

        <Flex display={{ sm: 'none' }} ml="4">
          <Tooltip className="radix-themes-custom-fonts" content="Navigation">
            <IconButton
              size="3"
              variant="ghost"
              color="gray"
              data-state={mobileMenu.open ? 'open' : 'closed'}
              onClick={handleMobileMenuClick}
            >
              <HamburgerMenuIcon width="16" height="16" />
            </IconButton>
          </Tooltip>
        </Flex>
      </div>

      <div className="flex items-center justify-start gap-8">
        <Navbar />
        <AccountConnectButton />

        <Tooltip className="radix-themes-custom-fonts" content="View GitHub">
          <IconButton asChild size="3" variant="ghost" color="gray">
            <a
              href="https://github.com/coinbase/build-onchain-apps/tree/main/apps/build-onchain-apps"
              target="_blank"
              aria-labelledby="View GitHub Button"
            >
              <GitHubLogoIcon width="16" height="16" />
            </a>
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}

export default Menu;
