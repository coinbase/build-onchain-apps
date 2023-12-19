import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import Image from 'next/image';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { AccountConnectButton } from '../../onchain';
import logo from '../../../public/logo.svg';
import { DefaultNavbar } from './Navbar';
import { useMobileMenuContext } from './MobileMenu';

function Menu() {
  const mobileMenu = useMobileMenuContext();

  const handleMobileMenuClick = useCallback(() => {
    mobileMenu.setOpen((open) => !open);
  }, [mobileMenu]);

  return (
    <>
      <Flex align="center" justify="center" position="absolute" top="0" bottom="0" left="0" pl="4">
        <NextLink href="/" passHref>
          <Image src={logo} alt="Onchain Coffee App" />
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
      </Flex>

      <Flex align="center" justify="center" height="100%" display={{ initial: 'none', sm: 'flex' }}>
        <DefaultNavbar />
      </Flex>

      <Flex align="center" gap="5" position="absolute" top="0" bottom="0" right="0" pr="4">
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
      </Flex>
    </>
  );
}

export default Menu;
