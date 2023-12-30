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
    <div className="grid grid-cols-1 items-stretch justify-start md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg">
      <div>
        <div className="mb-6 flex justify-start">
          <h2 className="mb-1 text-4xl font-bold">Messages</h2>
        </div>
        {memos?.length > 0 && <Memos memos={memos} />}
      </div>
      <div className="pt-9">
        <FormBuyCoffee onComplete={handleOncomplete} />
      </div>
    </div>
  );
}
