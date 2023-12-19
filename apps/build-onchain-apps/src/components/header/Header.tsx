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
    <div className="flex flex-row justify-center items-start w-screen h-[145px] bg-gradient-to-b from-orange-600 via-pink-500 to-pink-500">
      <div className="mt-[32px] w-[1280px] h-16 px-10 py-4 bg-white bg-opacity-10 rounded-[50px] border border-stone-300 backdrop-blur-2xl justify-between items-center inline-flex">
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
    </div>
  );
}

export default Header;
