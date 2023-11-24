import React, { useState, useCallback } from 'react';

import { useWaitForTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi';

import { parseEther } from 'viem';
import { Card, Text, Flex, Box, Button, Heading, TextFieldInput, TextArea } from '@radix-ui/themes';
import { contractAddress, contractABI } from '@/onchain/contract/contractInfo';

type FormBuyCoffeeProps = {
  onComplete: () => void;
};

function FormBuyCoffee({ onComplete }: FormBuyCoffeeProps) {
  // Component state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Wagmi Write call
  const { config } = usePrepareContractWrite({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
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
      <Flex direction="column">
        <Flex justify="center" position="relative">
          <form onSubmit={handleSubmit}>
            <Card size="4" style={{ width: 400 }}>
              <Heading as="h3" size="6" trim="start" mb="5">
                Buy Me A Coffee
              </Heading>

              <Box mb="5">
                <Text as="div" size="2" weight="medium" mb="2">
                  Name
                </Text>
                <TextFieldInput
                  placeholder="Enter your name"
                  value={name}
                  type="text"
                  onChange={handleNameChange}
                  required
                />
              </Box>

              <Box mb="5" position="relative">
                <Text as="div" size="2" weight="medium" mb="2">
                  Message
                </Text>
                <TextArea
                  value={message}
                  placeholder="Enter your message…"
                  onChange={handleMessageChange}
                />
              </Box>

              <Flex mt="6" justify="end" gap="3">
                <Button type="submit" disabled={loadingTransaction}>
                  Send 1 Coffee for 0.001ETH
                </Button>
              </Flex>
            </Card>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}

export default FormBuyCoffee;
