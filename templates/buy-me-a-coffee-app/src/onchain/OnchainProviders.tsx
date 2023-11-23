import React, { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public';

type Props = { children: ReactNode };

// TODO Docs ~~~
if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  const providerErrMessage =
    'To use Coinbase Wallet SDK you need to provide a NEXT_PUBLIC_ALCHEMY_API_KEY env variable';
  throw new Error(providerErrMessage);
}

// TODO Docs ~~~
// const projectID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

// TODO Docs ~~~
// https://wagmi.sh/react/providers/infura
const { chains, publicClient } = configureChains(
  [baseGoerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), publicProvider()],
);

const walletConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'BuyMeACoffee',
  },
});

console.log('mare.chains', chains);
console.log('mare.walletConnector', walletConnector);

/**
 * It handles the configuration for all hooks with CoinbaseWalletConnector
 * and supports connecting with Coinbase Wallet.
 */
const wagmiConfig = createConfig({
  connectors: [walletConnector],
  publicClient,
});

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default OnchainProviders;
