import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Flex } from '@radix-ui/themes';

export function AccountConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new CoinbaseWalletConnector({
      options: {
        appName: 'BuyMeACoffee',
      },
    }),
  });
  const { disconnect } = useDisconnect();

  const onDisconnect = () => {
    disconnect?.();
  };

  const onConnect = () => {
    connect?.();
  };

  console.log('ciao.0', address);
  console.log('ciao.1', isConnected);
  console.log('ciao.2', connect);
  console.log('ciao.3', isLoading);
  console.log('ciao.4', disconnect);

  return (
    <Flex gap="8">
      {isConnected ? (
        <button onClick={onDisconnect} type="button">
          {`${address.slice(0, 5)}...${address.slice(-4)}`}
        </button>
      ) : (
        <button onClick={onConnect} type="button">
          {isLoading ? <span>Loading..</span> : <span>Connect your wallet</span>}
        </button>
      )}
    </Flex>
  );
}
