import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import Memos from './Memos';
import BuyCoffeeFormStep from './steps/BuyCoffeeFormStep/BuyCoffeeFormStep';
import StartTransactionStep from './steps/StartTransactionStep/StartTransactionStep';
import TransactionCompleteStep from './steps/TransactionCompleteStep/TransactionCompleteStep';

export default function BuyMeCoffeeContractDemo() {
  const [transactionStep, setTransactionStep] = useState<string | null>(null);
  const [numCoffees, setNumCoffees] = useState(1);

  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  const asideContent = useMemo(() => {
    if (transactionStep === 'START_TRANSACTION') {
      return <StartTransactionStep />;
    }

    if (transactionStep === 'TRANSACTION_COMPLETE') {
      return (
        <TransactionCompleteStep numCoffees={numCoffees} setTransactionStep={setTransactionStep} />
      );
    }

    return (
      <BuyCoffeeFormStep
        onComplete={handleOncomplete}
        setTransactionStep={setTransactionStep}
        numCoffees={numCoffees}
        setNumCoffees={setNumCoffees}
      />
    );
  }, [transactionStep, handleOncomplete, numCoffees]);

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
        {asideContent}
      </aside>
    </div>
  );
}
