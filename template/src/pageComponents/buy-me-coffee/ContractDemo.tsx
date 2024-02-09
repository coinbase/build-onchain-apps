import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { markStep } from 'perfume.js';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import Memos from './Memos';
import BuyCoffeeFormStep from './steps/BuyCoffeeFormStep/BuyCoffeeFormStep';
import OutOfGasStep from './steps/OutOfGasStep/OutOfGasStep';
import StartTransactionStep from './steps/StartTransactionStep/StartTransactionStep';
import TransactionCompleteStep from './steps/TransactionCompleteStep/TransactionCompleteStep';

export enum TransactionSteps {
  START_TRANSACTION_STEP,
  TRANSACTION_COMPLETE_STEP,
  OUT_OF_GAS_STEP,
}

export default function BuyMeCoffeeContractDemo() {
  const [transactionStep, setTransactionStep] = useState<TransactionSteps | null>(null);
  const [numCoffees, setNumCoffees] = useState(1);

  const { data, result } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(async () => {
    markStep('useContractRead.refetchMemos');
    await result.refetch()
  }, [result]);

  const asideContent = useMemo(() => {
    if (transactionStep === TransactionSteps.START_TRANSACTION_STEP) {
      return <StartTransactionStep />;
    }

    if (transactionStep === TransactionSteps.TRANSACTION_COMPLETE_STEP) {
      return (
        <TransactionCompleteStep numCoffees={numCoffees} setTransactionStep={setTransactionStep} />
      );
    }

    if (transactionStep === TransactionSteps.OUT_OF_GAS_STEP) {
      return <OutOfGasStep buyCoffeeAmountRaw={0.001} setTransactionStep={setTransactionStep} />;
    }

    return (
      <BuyCoffeeFormStep
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onComplete={async () => handleOncomplete()}
        setTransactionStep={setTransactionStep}
        numCoffees={numCoffees}
        setNumCoffees={setNumCoffees}
      />
    );
  }, [transactionStep, numCoffees, handleOncomplete]);

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
        <Memos memos={data} />
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
