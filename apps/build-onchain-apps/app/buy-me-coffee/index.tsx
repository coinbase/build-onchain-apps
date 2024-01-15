'use client';

import { useEffect, useState } from 'react';
import BuyMeCoffeeContractDemo from '../../src/components/buy-me-coffee/ContractDemo';
import Disclaimer from '../../src/components/disclaimer/Disclaimer';
import Header from '../../src/components/header/Header';

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
      <main className="container mx-auto flex flex-col px-8">
        <Disclaimer />

        <BuyMeCoffeeContractDemo />
      </main>
    </>
  );
}
