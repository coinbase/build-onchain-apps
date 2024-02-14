import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { ReadContractErrorType } from 'viem';
import { TransactionSteps } from '../../ContractDemo';
import FormBuyCoffee from './FormBuyCoffee';

type BuyCoffeeFormStepProps = {
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  numCoffees: number;
  transactionStep: TransactionSteps | null;
  setNumCoffees: React.Dispatch<React.SetStateAction<number>>;
  refetchMemos: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      readonly {
        numCoffees: bigint;
        userName: string;
        twitterHandle: string;
        message: string;
        time: bigint;
        userAddress: `0x${string}`;
      }[],
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
