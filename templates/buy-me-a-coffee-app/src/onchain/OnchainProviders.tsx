import React, { ReactNode } from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, baseGoerli, goerli, mainnet, optimism, polygon, zora } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

type Props = { children: ReactNode };

const { chains, publicClient } = configureChains(
  [baseGoerli, mainnet, polygon, optimism, arbitrum, zora, goerli],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Dapp',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

/**
 * // TODO
 */
function OnchainProviders({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default OnchainProviders;
