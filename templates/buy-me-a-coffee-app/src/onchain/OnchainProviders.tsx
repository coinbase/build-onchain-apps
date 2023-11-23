import React, { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public';
import { getWalletConnector } from './utils/walletConnector';

type Props = { children: ReactNode };

// TODO Docs ~~~
if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  const providerErrMessage =
    'To use Coinbase Wallet SDK you need to provide a NEXT_PUBLIC_ALCHEMY_API_KEY env variable';
  throw new Error(providerErrMessage);
}

// TODO Docs ~~~
const { publicClient } = configureChains(
  [baseGoerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), publicProvider()],
);

/**
 * It handles the configuration for all hooks with CoinbaseWalletConnector
 * and supports connecting with Coinbase Wallet.
 */
const wagmiConfig = createConfig({
  connectors: [getWalletConnector()],
  publicClient,
});

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default OnchainProviders;
