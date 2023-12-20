import { Chain } from 'viem/chains';
import { createPublicClient, http } from 'viem';

export function getRpcProviderForChain(chain: Chain) {
  return createPublicClient({
    chain: chain,
    transport: http(chain.rpcUrls.default.http[0]),
  });
}
