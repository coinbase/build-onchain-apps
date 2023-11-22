import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Button, Flex, Dialog } from '@radix-ui/themes';
import { useCallback } from 'react';

const getSlicedAddress = (address: `0x${string}` | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export function AccountConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new CoinbaseWalletConnector({
      options: {
        appName: 'BuyMeACoffee',
      },
    }),
  });
  const { disconnect } = useDisconnect();

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
            <Button>{getSlicedAddress(address)}</Button>
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
