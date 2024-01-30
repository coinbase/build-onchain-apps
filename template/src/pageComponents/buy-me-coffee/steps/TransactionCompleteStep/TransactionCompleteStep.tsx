import { useCallback } from 'react';

type TransactionCompleteStepProps = {
  numCoffees: number;
  setTransactionStep: React.Dispatch<React.SetStateAction<string | null>>;
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
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        You bought {numCoffees} coffee{numCoffees > 1 ? 's' : null}!
      </h2>
      <button
        type="button"
        className="block w-full rounded-full bg-white py-4 text-center text-sm text-black"
        onClick={handleSendAnother}
      >
        Send another coffee
      </button>
    </>
  );
}
