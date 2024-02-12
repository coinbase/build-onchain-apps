import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import { ReadContractErrorType } from 'viem';
import BuyMeACoffeeABI from '../../../../contract/BuyMeACoffee';
import { TransactionSteps } from '../../ContractDemo';
import FormBuyCoffee from './FormBuyCoffee';

type BuyCoffeeFormStepProps = {
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  numCoffees: number;
  transactionStep: TransactionSteps | null;
  setNumCoffees: React.Dispatch<React.SetStateAction<number>>;
  refetchMemos: (
    options?: RefetchOptions | undefined,
  ) => Promise<
    QueryObserverResult<
      AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<typeof BuyMeACoffeeABI, 'getMemos'>['outputs']
      >[0],
      ReadContractErrorType
    >
  >;
};

export default function BuyCoffeeFormStep({
  setTransactionStep,
  numCoffees,
  setNumCoffees,
  transactionStep,
  refetchMemos,
}: BuyCoffeeFormStepProps) {
  return (
    <FormBuyCoffee
      setTransactionStep={setTransactionStep}
      numCoffees={numCoffees}
      setNumCoffees={setNumCoffees}
      transactionStep={transactionStep}
      refetchMemos={refetchMemos}
    />
  );
}
