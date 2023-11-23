import { useAccount, useBalance, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Box, Button, Flex, Dialog } from '@radix-ui/themes';
import { useCallback } from 'react';
import { getSlicedAddress } from '../utils/address';
import { getAccountBalance } from '../utils/balance';

/**
 * TODO Docs
 */
export function AccountConnectButton() {
  const { connect } = useConnect({
    connector: new CoinbaseWalletConnector({
      options: {
        appName: 'BuyMeACoffee',
      },
    }),
  });
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  console.log('chain', chain);
  console.log('chains', chains);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

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
      {isConnected ? (
        <Dialog.Root>
          <Dialog.Trigger>
            <Flex gap="3" align="center" justify="center">
              <Box width="auto"><b>{getAccountBalance(data)}</b></Box>
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
      ) : (
        <Button onClick={handleConnectWallet}>Connect Wallet</Button>
      )}
    </Flex>
  );
}
