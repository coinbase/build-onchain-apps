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
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <div className="flex">
          <h2>Messages</h2>
        </div>
        {memos?.length > 0 && <Memos memos={memos} />}
      </div>
      <div>
        <FormBuyCoffee onComplete={handleOncomplete} />
      </div>
    </div>
  );
}
