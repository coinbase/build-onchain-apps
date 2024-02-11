'use client';

import { ReactNode } from 'react';
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from 'viem';
import { WagmiProvider, createConfig, createStorage, http } from 'wagmi';
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

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Sigular',
      wallets: [rainbowWallet, metaMaskWallet, braveWallet, trustWallet, walletConnectWallet],
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
  ssr: true,
  chains: [baseSepolia, base],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors,
  storage: createStorage({ storage: window.localStorage }),
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
