import { TransactionSteps } from '../../ContractDemo';
import FormBuyCoffee from './FormBuyCoffee';

type BuyCoffeeFormStepProps = {
  onComplete: () => void;
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  numCoffees: number;
  setNumCoffees: React.Dispatch<React.SetStateAction<number>>;
};

export default function BuyCoffeeFormStep({
  onComplete,
  setTransactionStep,
  numCoffees,
  setNumCoffees,
}: BuyCoffeeFormStepProps) {
  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        Buy Me a Coffee!
      </h2>
      <FormBuyCoffee
        onComplete={onComplete}
        setTransactionStep={setTransactionStep}
        numCoffees={numCoffees}
        setNumCoffees={setNumCoffees}
      />
    </>
  );
}
