import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
