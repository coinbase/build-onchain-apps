import React, { useState, useCallback, useMemo } from 'react';

import clsx from 'clsx';
import { parseEther } from 'viem';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useBuyMeACoffeeContract } from '../../hooks/contracts';
import { useLoggedInUserCanAfford } from '../../hooks/useUserCanAfford';

type FormBuyCoffeeProps = {
  onComplete: () => void;
};

const BUY_COFFEE_AMOUNT_RAW = '0.0001';
const BUY_COFFEE_AMOUNT = parseEther(BUY_COFFEE_AMOUNT_RAW);
const NUMBER_OF_COFFEES = [1, 2, 3, 4];

function FormBuyCoffee({ onComplete }: FormBuyCoffeeProps) {
  // Component state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [coffeesSelected, setCoffeesSelected] = useState(1);

  // Get the correct contract info for current network (if present)
  const contract = useBuyMeACoffeeContract();

  // Calculate if the user can afford to buy coffee
  const canAfford = useLoggedInUserCanAfford(BUY_COFFEE_AMOUNT);

  // Wagmi Write call
  const { config } = usePrepareContractWrite({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'buyCoffee',
    args: [name, message],
    enabled: name !== '' && message !== '' && contract.status === 'ready',
    value: BUY_COFFEE_AMOUNT,
    onSuccess(data) {
      console.log('Success prepare buyCoffee', data);
    },
  });

  // Wagmi Write call
  const { write: buyMeACoffee, data: dataBuyMeACoffee } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Success write buyCoffee', data);
    },
  });

  const { isLoading: loadingTransaction } = useWaitForTransaction({
    hash: dataBuyMeACoffee?.hash,
    enabled: !!dataBuyMeACoffee,
    onSuccess() {
      onComplete();
      setName('');
      setMessage('');
    },
    onError() {
      onComplete();
      setName('');
      setMessage('');
    },
  });

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      buyMeACoffee?.();
    },
    [buyMeACoffee],
  );

  const handleNameChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setName(event.target.value);
    },
    [setName],
  );

  const handleMessageChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setMessage(event.target.value);
    },
    [setMessage],
  );

  const areInputsDisabled = contract.status !== 'ready' || loadingTransaction;

  const submitButton = useMemo(() => {
    if (!canAfford) {
      return (
        <span>
          You must have at least {String(BUY_COFFEE_AMOUNT_RAW)} ETH in your wallet to continue.
        </span>
      );
    }

    if (contract.status === 'notConnected') {
      return <span>Please connect your wallet to continue.</span>;
    }

    if (contract.status === 'onUnsupportedNetwork') {
      return (
        <span>
          Please connect to one of the supported networks to continue:{' '}
          {contract.supportedChains.map((c) => c.name).join(', ')}
        </span>
      );
    }

    if (contract.status === 'deactivated') {
      return <span>This contract has been deactivated on this chain.</span>;
    }

    return (
      <button type="submit" disabled={areInputsDisabled}>
        Send 1 Coffee for 0.001ETH
      </button>
    );
  }, [areInputsDisabled, contract.status, contract.supportedChains, canAfford]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="my-4 flex items-center gap-4">
        <div className="text-4xl">☕</div>
        <div className="font-sans text-xl">X</div>
        <div className="flex gap-3">
          {NUMBER_OF_COFFEES.map((numCoffee) => {
            return (
              <button
                key={`num-coffee-btn-${numCoffee}`}
                type="button"
                className={clsx(
                  `${
                    coffeesSelected === numCoffee
                      ? 'bg-gradient-2'
                      : 'border-boat-color-orange border'
                  } block h-[40px] w-[40px] rounded`,
                )}
                onClick={() => setCoffeesSelected(numCoffee)}
              >
                {numCoffee}
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
              'block w-full rounded-lg border border-gray-600 bg-gray-700',
              'p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            ])}
            placeholder="Enter your name"
            onChange={handleNameChange}
            disabled={areInputsDisabled}
            required
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
              'block w-full rounded-lg border border-gray-600 bg-gray-700',
              'p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            ])}
            placeholder="Enter your message..."
            onChange={handleMessageChange}
            disabled={areInputsDisabled}
            required
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">{submitButton}</div>
      </div>
    </form>
  );
}

export default FormBuyCoffee;
