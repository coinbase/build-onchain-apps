import { Memos } from './components/Memos';
import useBuyMeACoffeeMemos from './hooks/useBuyMeACoffeeMemos';

function BuyMeACoffeeMemos() {
  const { memos } = useBuyMeACoffeeMemos();

  if (!memos) return null;

  return <Memos memos={memos} />;
}

export { BuyMeACoffeeMemos };
