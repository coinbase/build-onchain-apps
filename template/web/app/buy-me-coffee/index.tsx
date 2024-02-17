'use client';

import { useEffect, useState } from 'react';
import Banner from '@/components/banner/banner';
import Header from '@/components/header/Header';
import HorizontalLine from '@/components/horizontal-line/HorizontalLine';
import BuyMeCoffeeContractDemo from './_components/ContractDemo';
import Guide from './_components/Guide';
import Profile from './_components/Profile';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function BuyMeCoffeePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //  Fix hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="mx-auto flex flex-col py-6">
        <section className="container px-8">
          <Banner pageName="Buy Me A Coffee" pageUrl="buy-me-coffee" />
        </section>
        <HorizontalLine />
        <section className="container px-8">
          <Profile />
        </section>
        <section className="container px-8">
          <BuyMeCoffeeContractDemo />
        </section>
        <section className="container px-8">
          <Guide />
        </section>
      </main>
    </>
  );
}
