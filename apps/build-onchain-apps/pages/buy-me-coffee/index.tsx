import { useEffect, useState } from 'react';
import BuyMeCoffeeContractDemo from '../../src/components/buy-me-coffee/ContractDemo';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';

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
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <Header />
      <main className="container mx-auto flex flex-col">
        <BuyMeCoffeeContractDemo />
      </main>
    </>
  );
}
