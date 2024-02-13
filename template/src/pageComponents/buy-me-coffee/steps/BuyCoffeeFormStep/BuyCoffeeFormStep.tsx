import { TransactionSteps } from '../../ContractDemo';
import OutOfGasStep from '../OutOfGasStep';
import StartTransactionStep from '../StartTransactionStep';
import TransactionCompleteStep from '../TransactionCompleteStep';
import FormBuyCoffee, { type FormBuyCoffeeProps } from './FormBuyCoffee';

type BuyCoffeeFormStepProps = FormBuyCoffeeProps & {
  transactionStep: TransactionSteps | null;
};

export default function BuyCoffeeFormStep(props: BuyCoffeeFormStepProps) {
  const { setTransactionStep, numCoffees, transactionStep } = props;

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

  return <FormBuyCoffee {...props} />;
}
