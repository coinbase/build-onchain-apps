import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function createWagmiConfig(projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }
  return createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appChainIds: [baseSepolia.id],
        appName: 'buildonchainapps',
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(baseSepoliaUrl),
      [base.id]: http(baseUrl),
    },
  });
}
