import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  trustWallet,
  ledgerWallet,
  braveWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { getChainsForEnvironment } from './supportedChains';

export function createWagmiConfig(projectId: string) {
  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended Wallet',
        wallets: [coinbaseWallet],
      },
      {
        groupName: 'Other Wallets',
        wallets: [
          rainbowWallet,
          metaMaskWallet,
          trustWallet,
          braveWallet,
          ledgerWallet,
          walletConnectWallet,
        ],
      },
    ],
    {
      appName: 'buildonchainapps',
      projectId,
    },
  );

  return createConfig({
    ssr: true,
    chains: getChainsForEnvironment(),
    transports: {
      [baseSepolia.id]: http(),
      [base.id]: http(),
    },
    connectors,
  });
}
