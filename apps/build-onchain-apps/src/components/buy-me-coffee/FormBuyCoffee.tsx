import React, { useState, useCallback } from 'react';

import { useWaitForTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi';

import { parseEther } from 'viem';
import { Box, Button, Heading, TextFieldInput, TextArea } from '@radix-ui/themes';
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
    <Box style={{ whiteSpace: 'nowrap' }}>
      <div className="flex flex-col justify-start">
        <div className="relative flex justify-center">
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="rounded-xl border border-solid border-neutral-700 bg-neutral-900 p-8">
              <Heading as="h3" size="6" trim="start" mb="5">
                Buy Me A Coffee
              </Heading>

              <Box mb="5">
                <label className="mb-2 text-sm font-medium" htmlFor="buy_me_coffee_name">
                  Name
                </label>
                <TextFieldInput
                  placeholder="Enter your name"
                  value={name}
                  type="text"
                  onChange={handleNameChange}
                  required
                  id="buy_me_coffee_name"
                />
              </Box>

              <Box mb="5" position="relative">
                <label className="mb-2 text-sm font-medium" htmlFor="buy_me_coffee_message">
                  Message
                </label>
                <TextArea
                  value={message}
                  placeholder="Enter your message…"
                  onChange={handleMessageChange}
                  id="buy_me_coffee_message"
                />
              </Box>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="submit" disabled={loadingTransaction}>
                  Send 1 Coffee for 0.001ETH
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}

export default FormBuyCoffee;
