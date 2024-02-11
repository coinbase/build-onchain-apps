'use client';

import { ReactNode } from 'react';
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from 'viem';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

// TODO Docs ~~~
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';
if (!projectId) {
  const providerErrMessage =
    'To connect to all Wallets you need to provide a NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable';
  throw new Error(providerErrMessage);
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
  chains: [baseSepolia, base],
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
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
