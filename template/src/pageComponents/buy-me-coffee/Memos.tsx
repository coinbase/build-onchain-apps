import MemoCard from './MemoCard';
import type { CoffeeMemo } from '../../types';

type MemosProps = {
  memos: CoffeeMemo[];
};

/**
 * Memos received from coffee purchases in BuyMeACoffee smart contract.
 * https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts/blob/main/contracts/BuyMeACoffee.sol#L28C18-L29C1
 * @param memos List of memos.
 */
function Memos({ memos }: MemosProps) {
  if (!memos) return null;
  return (
    <ul className="flex w-full flex-col items-center gap-10">
      {memos
        .map((memo) => {
          return (
            <MemoCard
              key={memo.time.toString()}
              numCoffees={memo.numCoffees}
              userName={memo.userName}
              twitterHandle={memo.twitterHandle}
              message={memo.message}
              userAddress={memo.userAddress}
              time={memo.time}
            />
          );
        })
        .reverse()}
    </ul>
  );
}

export default Memos;
