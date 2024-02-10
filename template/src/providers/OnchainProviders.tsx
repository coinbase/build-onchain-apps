'use client';

import React, { ReactNode } from 'react';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  rainbowWallet,
  metaMaskWallet,
  braveWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from 'viem';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { getChainsForEnvironment } from '../store/supportedChains';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

// TODO Docs ~~~
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';
if (!projectId) {
  const providerErrMessage =
    'Missing NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID in .env file. Obtain Wallet Connect Project ID at https://cloud.walletconnect.com';
  throw new Error(providerErrMessage);
}

// TODO Docs ~~~
const supportedChains = getChainsForEnvironment();
if (!supportedChains) {
  throw new Error('Must configure supported chains in store/supportedChains');
}

const { wallets } = getDefaultWallets();

const connectors = connectorsForWallets(
  [
    ...wallets,
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Other Wallets',
      wallets: [rainbowWallet, metaMaskWallet, braveWallet, trustWallet],
    },
  ],
  {
    appName: 'buildonchainapps',
    projectId,
  },
);

/**
 * It handles the configuration for all hooks with CoinbaseWalletConnector
 * and supports connecting with Coinbase Wallet.
 */
const wagmiConfig = createConfig({
  chains: supportedChains,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors,
});

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
