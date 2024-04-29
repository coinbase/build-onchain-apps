import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function createWagmiConfig() {
  return createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: 'buildonchainapps',
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
      [base.id]: http(),
    },
  });
}
