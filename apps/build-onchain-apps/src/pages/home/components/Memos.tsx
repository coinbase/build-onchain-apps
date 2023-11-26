import { Flex } from '@radix-ui/themes';
import MemoCard from './MemoCard';
import type { CoffeeMemo } from '@/types';

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
    <Flex direction="column" gap="3" width="100%">
      {memos
        .map((memo) => {
          return (
            <MemoCard
              key={memo.timestamp.toString()}
              name={memo.name}
              message={memo.message}
              timestamp={memo.timestamp}
            />
          );
        })
        .reverse()}
    </Flex>
  );
}

export default Memos;
