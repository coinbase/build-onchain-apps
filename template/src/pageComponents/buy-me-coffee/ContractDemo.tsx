import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import Memos from './Memos';
import BuyCoffeeFormStep from './steps/BuyCoffeeFormStep/BuyCoffeeFormStep';

export enum TransactionSteps {
  START_TRANSACTION_STEP,
  TRANSACTION_COMPLETE_STEP,
  OUT_OF_GAS_STEP,
}

export default function BuyMeCoffeeContractDemo() {
  const [transactionStep, setTransactionStep] = useState<TransactionSteps | null>(null);
  const [numCoffees, setNumCoffees] = useState(1);
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const asideContent = useMemo(() => {
    return (
      <BuyCoffeeFormStep
        setTransactionStep={setTransactionStep}
        numCoffees={numCoffees}
        transactionStep={transactionStep}
        setNumCoffees={setNumCoffees}
        refetchMemos={refetchMemos}
      />
    );
  }, [numCoffees, transactionStep, refetchMemos]);

  return (
    <div
      className={clsx([
        'my-10 grid grid-cols-1 items-stretch justify-start md:my-14',
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
      <aside>
        <div
          className={clsx([
            'mt-10 rounded-3xl border border-solid border-boat-color-palette-line',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          {asideContent}
        </div>
      </aside>
    </div>
  );
}
