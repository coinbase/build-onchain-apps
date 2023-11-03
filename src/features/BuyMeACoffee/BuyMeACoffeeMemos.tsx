import { Memos } from './components/Memos';
import useBuyMeACoffeeMemos from './hooks/useBuyMeACoffeeMemos';

/**
 * Display memos from coffee purchases
 * Cointainer is reading messages from BuyMeACoffee smart contract.
 */
function BuyMeACoffeeMemos() {
  const { memos } = useBuyMeACoffeeMemos();

  if (!memos) return null;

  return <Memos memos={memos} />;
}

export { BuyMeACoffeeMemos };
