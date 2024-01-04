import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import styles from './Header.module.css';
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
    <div
      data-scroll-state={scrollState}
      className={clsx(styles.HeaderRoot, ghost ? styles.ghost : '')}
    >
      <div className="fixed z-10 inline-flex h-[72px]  w-screen items-center justify-between rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl xl:w-[1280px]">
        <Menu />
      </div>
    </div>
  );
}

export default Header;
