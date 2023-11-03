import { use, useEffect } from 'react';
import { Memos } from './components/Memos';
import useBuyMeACoffeeMemos from './hooks/useBuyMeACoffeeMemos';

/**
 * Display memos from coffee purchases
 * Cointainer is reading messages from BuyMeACoffee smart contract.
 */
function BuyMeACoffeeMemos() {
  const { memos, refetchMemos } = useBuyMeACoffeeMemos();

  // write inside useEffect hook reftech memos every 10 seconds 
  useEffect(() => {
    const interval = setInterval(() => {
      refetchMemos();
    }, 10000);
    return () => clearInterval(interval);
  } , [refetchMemos]);

  if (!memos) return null;

  return <Memos memos={memos} />;
}

export { BuyMeACoffeeMemos };
