import { useAccount, useBalance, useDisconnect, useNetwork } from 'wagmi';
import { Box, Button, Flex, Dialog, Text } from '@radix-ui/themes';
import { useCallback } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useCurrentBlockNumber from '../hooks/useBlockNumber';
import { getSlicedAddress } from './utils/address';
import { getAccountBalance } from './utils/balance';
import '@rainbow-me/rainbowkit/styles.css';

/**
 * TODO Docs
 */
export function AccountConnectButton() {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { disconnect } = useDisconnect();
  const block = useCurrentBlockNumber();
  const network = useNetwork();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  // onClick handler function for the copy button
  const handleCopyAddress = useCallback(() => {
    navigator.clipboard
      .writeText(address as string)
      .then(() => {
        // set is copied
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  return (
    <Flex gap="8">
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Flex gap="3" align="center" justify="center">
                        <Box width="auto" display={{ initial: 'none', md: 'block' }}>
                          <b>{getAccountBalance(data)}</b>
                        </Box>
                        <Box width="auto">
                          <Button>{getSlicedAddress(address)}</Button>
                        </Box>
                      </Flex>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                      <Dialog.Title>{getSlicedAddress(address)}</Dialog.Title>
                      <Dialog.Description size="2" mb="4">
                        ~~~
                      </Dialog.Description>

                      <Flex gap="3">
                        <Text as="div" size="2" mb="1" weight="bold">
                          Network:
                        </Text>
                        <Text as="div" size="2" mb="1" weight="regular">
                          {network.chain?.name} ({network.chain?.id})
                        </Text>
                      </Flex>

                      <Flex gap="3">
                        <Text as="div" size="2" mb="1" weight="bold">
                          Block Number:
                        </Text>
                        <Text as="div" size="2" mb="1" weight="regular">
                          {block.isLoading ? 'Loading...' : block.blockNumber?.toString()}
                        </Text>
                      </Flex>

                      <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close onClick={handleCopyAddress}>
                          <Button>Copy Address</Button>
                        </Dialog.Close>
                        <Dialog.Close onClick={handleDisconnectWallet}>
                          <Button>Disconnect</Button>
                        </Dialog.Close>
                      </Flex>
                    </Dialog.Content>
                  </Dialog.Root>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </Flex>
  );
}
