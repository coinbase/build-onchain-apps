import { useCallback } from 'react';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <div className="mb-16 mt-10 grid grid-cols-1 items-stretch justify-start md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg">
      <div className="rounded-3xl border border-solid border-boat-color-palette-line bg-boat-color-palette-backgroundalternate p-10">
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-4">
            <div className="w-fit text-2xl font-semibold text-white">Messages from supporters</div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            {memos?.length > 0 && <Memos memos={memos} />}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-solid border-boat-color-palette-line bg-boat-color-palette-backgroundalternate p-10">
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-4">
            <div className="w-fit text-2xl font-semibold text-white">Buy Me a Coffee!</div>
          </div>
          <FormBuyCoffee onComplete={handleOncomplete} />
        </div>
      </div>
    </div>
  );
}
