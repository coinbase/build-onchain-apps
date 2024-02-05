'use client';

import { useEffect, useState } from 'react';
import Banner from '../../src/components/banner/banner';
import Header from '../../src/components/header/Header';
import HorizontalLine from '../../src/components/horizontal-line/HorizontalLine';
import BuyMeCoffeeContractDemo from '../../src/pageComponents/buy-me-coffee/ContractDemo';
import Guide from '../../src/pageComponents/buy-me-coffee/Guide';
import Introduction from '../../src/pageComponents/buy-me-coffee/Introduction';

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
  if (!isMounted) return null;

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-6">
        <Banner pageName="Buy Me A Coffee" pageUrl="buy-me-coffee" />
        <HorizontalLine />
        <Introduction />
        <BuyMeCoffeeContractDemo />
        <Guide />
      </main>
    </>
  );
}
