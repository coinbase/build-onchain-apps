import { baseGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

/**
 * TODO Docs
 */
export const getWalletConnector = () => {
  return new CoinbaseWalletConnector({
    chains: [baseGoerli],
    options: {
      appName: 'BuyMeACoffee',
      jsonRpcUrl: 'https://chain-proxy.wallet.coinbase.com?targetName=base-goerli',
      chainId: baseGoerli.id,
    },
  });
};
