import { useCallback } from 'react';
import Button from '../../../components/Button/Button';
import { TransactionSteps } from '../ContractDemo';

type TransactionCompleteStepProps = {
  numCoffees: number;
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
};

export default function TransactionCompleteStep({
  numCoffees,
  setTransactionStep,
}: TransactionCompleteStepProps) {
  const handleSendAnother = useCallback(() => {
    setTransactionStep(null);
  }, [setTransactionStep]);

  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">
        You bought {numCoffees} coffee{numCoffees > 1 ? 's' : null}!
      </h2>

      <div className="text-center text-6xl">🎁</div>

      <div className="my-4 text-center text-sm text-gray-400">
        Thank you for supporting this endeavor!
      </div>

      <Button buttonContent="Send another coffee" onClick={handleSendAnother} />
    </>
  );
}
