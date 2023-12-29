import React, { useState, useCallback } from 'react';

import { useWaitForTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi';

import { parseEther } from 'viem';
import { TextFieldInput, TextArea } from '@radix-ui/themes';
import { baseGoerli } from 'viem/chains';
import { contract } from '../../contract/ContractSpecification';

type FormBuyCoffeeProps = {
  onComplete: () => void;
};

function FormBuyCoffee({ onComplete }: FormBuyCoffeeProps) {
  // Component state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Wagmi Write call
  const { config } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address: contract.buyMeACoffee[baseGoerli.id].address,
    abi: contract.buyMeACoffee.abi,
    functionName: 'buyCoffee',
    args: [name, message],
    enabled: name !== '' && message !== '',
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

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-items-center">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <h3>Buy Me A Coffee</h3>

          <p>Name</p>
          <TextFieldInput
            placeholder="Enter your name"
            value={name}
            type="text"
            onChange={handleNameChange}
            required
          />

          <p>Message</p>
          <TextArea
            value={message}
            placeholder="Enter your message…"
            onChange={handleMessageChange}
          />

          <div className="flex">
            <button type="submit" disabled={loadingTransaction}>
              Send 1 Coffee for 0.001ETH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormBuyCoffee;
