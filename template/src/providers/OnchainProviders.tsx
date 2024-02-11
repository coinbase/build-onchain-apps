'use client';

import { ReactNode } from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, baseSepolia } from 'viem/chains';
import { WagmiProvider, http } from 'wagmi';

type Props = { children: ReactNode };

// TODO Docs ~~~
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';
if (!projectId) {
  const providerErrMessage =
    'To connect to all Wallets you need to provide a NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable';
  throw new Error(providerErrMessage);
}

// TODO Docs ~~~
const config = getDefaultConfig({
  appName: 'boat',
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})


const queryClient = new QueryClient()

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={config}>
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
