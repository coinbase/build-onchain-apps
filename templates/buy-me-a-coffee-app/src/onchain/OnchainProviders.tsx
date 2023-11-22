import React, { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

type Props = { children: ReactNode };

// TODO Docs ~~~
if (!process.env.NEXT_PUBLIC_INFURA_ID) {
  const infuriaErrMessage =
    'To use Coinbase Wallet SDK you need to provide a NEXT_PUBLIC_INFURA_ID env variable';
  throw new Error(infuriaErrMessage);
}

// TODO Docs ~~~
const chains = [baseGoerli];
const apiKey = process.env.NEXT_PUBLIC_INFURA_ID || '';

// TODO Docs ~~~
// https://wagmi.sh/react/providers/infura
const { publicClient } = configureChains(chains, [infuraProvider({ apiKey }), publicProvider()]);

/**
 * It handles the configuration for all hooks with CoinbaseWalletConnector
 * and supports connecting with Coinbase Wallet.
 */
const wagmiConfig = createConfig({
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'BuyMeACoffee',
      },
    }),
  ],
  publicClient,
});

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default OnchainProviders;
