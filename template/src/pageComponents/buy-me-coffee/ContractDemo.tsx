import { useCallback } from 'react';
import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <div
      className={clsx([
        'mb-16 mt-10 grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
      <section
        className={clsx([
          'rounded-3xl border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10',
        ])}
      >
        <h2 className="mb-5 w-fit text-2xl font-semibold text-white">Messages from supporters</h2>
        {memos?.length > 0 && <Memos memos={memos} />}
      </section>
      <aside
        className={clsx([
          'rounded-3xl border border-solid border-boat-color-palette-line',
          'mt-10 bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
        ])}
      >
        <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
          Buy Me a Coffee!
        </h2>
        <FormBuyCoffee onComplete={handleOncomplete} />
      </aside>
    </div>
  );
}
