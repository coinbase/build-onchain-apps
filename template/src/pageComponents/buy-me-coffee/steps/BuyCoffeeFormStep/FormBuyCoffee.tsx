import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { ReadContractErrorType, TransactionExecutionError, parseEther } from 'viem';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import Button from '../../../../components/Button/Button';
import { useBuyMeACoffeeContract } from '../../../../hooks/contracts';
import { useLoggedInUserCanAfford } from '../../../../hooks/useUserCanAfford';
import { TransactionSteps } from '../../ContractDemo';
import OutOfGasStep from '../OutOfGasStep';
import StartTransactionStep from '../StartTransactionStep';
import TransactionCompleteStep from '../TransactionCompleteStep';

type FormBuyCoffeeProps = {
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  numCoffees: number;
  setNumCoffees: React.Dispatch<React.SetStateAction<number>>;
  transactionStep: TransactionSteps | null;
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

const BUY_COFFEE_AMOUNT_RAW = 0.0001;
const NUMBER_OF_COFFEES = [1, 2, 3, 4];

function FormBuyCoffee({
  setTransactionStep,
  numCoffees,
  setNumCoffees,
  transactionStep,
  refetchMemos,
}: FormBuyCoffeeProps) {
  // Component state
  const [name, setName] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [message, setMessage] = useState('');
  const [buyCoffeeAmount, setBuyCoffeeAmount] = useState(BUY_COFFEE_AMOUNT_RAW);
  const [dataHash, setDataHash] = useState<string | undefined>();

  useEffect(() => {
    setBuyCoffeeAmount(BUY_COFFEE_AMOUNT_RAW * numCoffees);
  }, [numCoffees]);

  // Get the correct contract info for current network (if present)
  const contract = useBuyMeACoffeeContract();

  // Calculate if the user can afford to buy coffee
  const canAfford = useLoggedInUserCanAfford(parseEther(String(buyCoffeeAmount)));

  const handleOncomplete = useCallback(async () => {
    await refetchMemos();
  }, [refetchMemos]);

  // Wagmi Write call
  const { data: buyCoffeeData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'buyCoffee',
    args: [BigInt(numCoffees), name, twitterHandle, message],
    query: {
      enabled: name !== '' && message !== '' && contract.status === 'ready',
    },
    value: parseEther(String(buyCoffeeAmount)),
  });

  const {
    writeContract: buyMeACoffee,
    data: dataBuyMeACoffee,
    status: statusBuyMeACoffee,
    error: errorBuyMeACoffee,
  } = useWriteContract();

  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataBuyMeACoffee,
    query: {
      enabled: !!dataBuyMeACoffee,
    },
  });

  useEffect(() => {
    async function handleTransactionStatus() {
      if (transactionStatus === 'error' && dataHash !== '') {
        await handleOncomplete();
        setDataHash('');
        setName('');
        setTwitterHandle('');
        setMessage('');
        if (
          errorBuyMeACoffee instanceof TransactionExecutionError &&
          errorBuyMeACoffee.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionStep(TransactionSteps.OUT_OF_GAS_STEP);
        } else {
          setTransactionStep(null);
        }
      } else if (transactionStatus === 'success' && dataHash !== '') {
        await handleOncomplete();
        setDataHash('');
        setName('');
        setTwitterHandle('');
        setMessage('');
        setTransactionStep(TransactionSteps.TRANSACTION_COMPLETE_STEP);
      }
    }
    void handleTransactionStatus();
  }, [
    dataHash,
    errorBuyMeACoffee,
    handleOncomplete,
    setTransactionStep,
    statusBuyMeACoffee,
    transactionStatus,
  ]);

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (buyCoffeeData?.request) {
        buyMeACoffee?.(buyCoffeeData?.request);
        setTransactionStep(TransactionSteps.START_TRANSACTION_STEP);
        setDataHash(dataBuyMeACoffee);
      } else {
        setTransactionStep(null);
      }
    },
    [buyCoffeeData?.request, buyMeACoffee, dataBuyMeACoffee, setTransactionStep],
  );

  const handleNameChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setName(event.target.value);
    },
    [setName],
  );

  const handleTwitterHandleChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setTwitterHandle(event.target.value);
    },
    [setTwitterHandle],
  );

  const handleMessageChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setMessage(event.target.value);
    },
    [setMessage],
  );

  const formDisabled = useMemo(() => {
    return contract.status !== 'ready' || statusBuyMeACoffee === 'pending' || !canAfford;
  }, [canAfford, contract.status, statusBuyMeACoffee]);

  const submitButtonContent = useMemo(() => {
    return (
      <>
        Send {numCoffees} coffee{numCoffees > 1 ? 's' : null} for{' '}
        {String(buyCoffeeAmount.toFixed(4))} ETH
      </>
    );
  }, [buyCoffeeAmount, numCoffees]);

  const warningContent = useMemo(() => {
    if (contract.status === 'notConnected') {
      return <>Please connect your wallet to continue.</>;
    }

    if (!canAfford) {
      return (
        <>You must have at least {String(BUY_COFFEE_AMOUNT_RAW)} ETH in your wallet to continue.</>
      );
    }

    if (contract.status === 'onUnsupportedNetwork') {
      return (
        <>
          Please connect to one of the supported networks to continue:{' '}
          {contract.supportedChains.map((c) => c.name).join(', ')}
        </>
      );
    }

    if (contract.status === 'deactivated') {
      return <>This contract has been deactivated on this chain.</>;
    }

    return null;
  }, [canAfford, contract.status, contract.supportedChains]);

  return (
    <>
      {transactionStep === TransactionSteps.START_TRANSACTION_STEP && <StartTransactionStep />}

      {transactionStep === TransactionSteps.TRANSACTION_COMPLETE_STEP && (
        <TransactionCompleteStep numCoffees={numCoffees} setTransactionStep={setTransactionStep} />
      )}

      {transactionStep === TransactionSteps.OUT_OF_GAS_STEP && (
        <OutOfGasStep buyCoffeeAmountRaw={0.001} setTransactionStep={setTransactionStep} />
      )}

      {transactionStep === null && (
        <>
          <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
            Buy Me a Coffee!
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="my-4 items-center lg:flex lg:gap-4">
              <div className="text-center text-4xl lg:text-left">☕</div>
              <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">X</div>
              <div className="mx-auto flex max-w-[300px] gap-3 lg:max-w-max">
                {NUMBER_OF_COFFEES.map((numberCoffee) => {
                  return (
                    <button
                      key={`num-coffee-btn-${numberCoffee}`}
                      type="button"
                      className={clsx(
                        `${
                          numCoffees === numberCoffee
                            ? 'bg-gradient-2'
                            : 'border border-boat-color-orange'
                        } block h-[40px] w-full rounded lg:w-[40px]`,
                      )}
                      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                      onClick={() => setNumCoffees(numberCoffee)}
                    >
                      {numberCoffee}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={clsx([
                    'block w-full rounded-lg border border-gray-600 bg-boat-color-gray-900',
                    'p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  ])}
                  placeholder="Name"
                  onChange={handleNameChange}
                  disabled={formDisabled}
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="twitterHandle"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Twitter handle (Optional)
                </label>
                <input
                  type="text"
                  id="twitterHandle"
                  className={clsx([
                    'block w-full rounded-lg border border-gray-600 bg-boat-color-gray-900',
                    'p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  ])}
                  placeholder="@"
                  onChange={handleTwitterHandleChange}
                  disabled={formDisabled}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  value={message}
                  id="message"
                  className={clsx([
                    'block w-full rounded-lg border border-gray-600 bg-boat-color-gray-900',
                    'p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  ])}
                  placeholder="Say something"
                  onChange={handleMessageChange}
                  disabled={formDisabled}
                  required
                />
              </div>

              {warningContent ? (
                <div className="my-3 flex items-center justify-center">
                  <div className="mr-2">
                    <ExclamationTriangleIcon width={12} height={12} />
                  </div>
                  <div className="text-xs">{warningContent}</div>
                </div>
              ) : null}

              <Button buttonContent={submitButtonContent} type="submit" disabled={formDisabled} />
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default FormBuyCoffee;
