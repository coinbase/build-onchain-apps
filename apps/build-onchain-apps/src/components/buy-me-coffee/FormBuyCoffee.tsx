import React, { useState, useCallback, useMemo } from 'react';

import { parseEther } from 'viem';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useBuyMeACoffeeContract } from '../../onchain/hooks/contracts';

type FormBuyCoffeeProps = {
  onComplete: () => void;
};

function FormBuyCoffee({ onComplete }: FormBuyCoffeeProps) {
  // Component state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Get the correct contract info for current network (if present)
  const contract = useBuyMeACoffeeContract();

  // Wagmi Write call
  const { config } = usePrepareContractWrite({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'buyCoffee',
    args: [name, message],
    enabled: name !== '' && message !== '' && contract.status === 'ready',
    value: parseEther('0.001'),
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

  if (contract.status === 'notConnected') {
    // TODO: render not connected state here
  }

  if (contract.status === 'onUnsupportedNetwork') {
    // TODO: render network switcher here
  }

  if (contract.status === 'deactivated') {
    // TODO: indicate that this contract has been deactivated
  }

  const submitButton = useMemo(() => {
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
  }, [areInputsDisabled, contract.status, contract.supportedChains]);

  return (
    <div className="flex flex-col justify-start">
      <div className="relative flex justify-center">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="rounded-xl border border-solid border-neutral-700 bg-neutral-900 p-8">
            <h3 className="mb-5">Buy Me A Coffee</h3>

            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                First name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
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
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your message..."
                onChange={handleMessageChange}
                disabled={areInputsDisabled}
                required
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">{submitButton}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormBuyCoffee;
