import { useState, useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import { classNames } from '../../utils/classNames';
import styles from '../../styles/Header.module.css';
import { DefaultNavbar } from './Navbar';
import { MobileMenu } from './MobileMenu';
import Menu from './Menu';

export type HeaderProps = {
  ghost?: boolean;
};

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

function Header({ ghost }: HeaderProps) {
  const [scrollState, setScrollState] = useState<ScrollState>('at-top');

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const direction = previousScrollY < window.scrollY ? 'scrolling-down' : 'scrolling-up';
      const state = window.scrollY < 30 ? 'at-top' : direction;
      previousScrollY = window.scrollY;
      setScrollState(state);
    };

    if (ghost) {
      addEventListener('scroll', handleScroll, { passive: true });
    } else {
      removeEventListener('scroll', handleScroll);
    }

    handleScroll();
    return () => removeEventListener('scroll', handleScroll);
  }, [ghost]);

  return (
    <Theme asChild className="radix-themes-custom-fonts">
      <div
        data-scroll-state={scrollState}
        className={classNames(styles.HeaderRoot, ghost ? styles.ghost : '')}
      >
        <MobileMenu>
          <DefaultNavbar />
        </MobileMenu>

        <div className={styles.HeaderInner}>
          <Menu />
        </div>
      </div>
    </Theme>
  );
}

export default Header;
