'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL ?? '';
if (!rpcUrl) {
  const rpcErrMessage =
    'To connect to the blockchain you need to provide a NEXT_PUBLIC_RPC_URL env variable';
  throw new Error(rpcErrMessage);
}

const wagmiConfig = createWagmiConfig(rpcUrl);

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={baseSepolia}>{children}</OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
