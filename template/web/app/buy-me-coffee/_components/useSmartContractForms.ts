import { useCallback, useEffect, useMemo, useState } from 'react';
import { Abi, TransactionExecutionError } from 'viem';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { UseContractReturn } from '@/hooks/contracts';
import { useLoggedInUserCanAfford } from '@/hooks/useUserCanAfford';

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

type AsyncFunction<Args extends unknown[], ReturnType> = (...args: Args) => Promise<ReturnType>;

export default function useSmartContractForms({
  gasFee,
  contract,
  name: functionName,
  arguments: args,
  enableSubmit: isValid,
  reset,
}: {
  gasFee: bigint;
  contract: UseContractReturn<Abi>;
  name: string;
  arguments: (number | string)[];
  enableSubmit: boolean;
  reset: AsyncFunction<unknown[], unknown>;
}) {
  const [transactionState, setTransactionState] = useState<TransactionStates | null>(null);

  const canAfford = useLoggedInUserCanAfford(gasFee);

  const { data: contractRequest } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: functionName,
    args: args,
    query: {
      enabled: isValid && contract.status === 'ready',
    },
    value: gasFee,
  });

  const {
    writeContract,
    data: dataHash,
    status: writeContractStatus,
    error: writeContractError,
  } = useWriteContract();

  const { status: transactionReceiptStatus } = useWaitForTransactionReceipt({
    hash: dataHash,
    query: {
      enabled: !!dataHash,
    },
  });

  const disabled = contract.status !== 'ready' || writeContractStatus === 'pending' || !canAfford;

  const onSubmitTransaction = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();

      const request = contractRequest?.request;

      if (request) {
        writeContract(contractRequest?.request);
        setTransactionState(TransactionStates.START);
      } else {
        setTransactionState(null);
      }
    },
    [contractRequest, writeContract],
  );

  const resetContractForms = useCallback(() => {
    setTransactionState(null);
  }, []);

  useEffect(() => {
    async function onTransactionReceiptStatus() {
      if ((dataHash as string) === '') return;

      if (transactionReceiptStatus === 'error') {
        if (
          writeContractError instanceof TransactionExecutionError &&
          writeContractError.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionState(TransactionStates.OUT_OF_GAS);
        } else {
          setTransactionState(null);
        }
      }

      if (transactionReceiptStatus === 'success') {
        setTransactionState(TransactionStates.COMPLETE);
      }

      await reset();
    }

    void onTransactionReceiptStatus();
  }, [dataHash, reset, setTransactionState, transactionReceiptStatus, writeContractError]);

  return useMemo(
    () => ({
      disabled,
      transactionState,
      resetContractForms,
      onSubmitTransaction,
    }),
    [onSubmitTransaction, transactionState, disabled, resetContractForms],
  );
}
