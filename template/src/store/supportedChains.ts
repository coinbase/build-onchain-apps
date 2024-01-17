import { baseSepolia, Chain, base } from 'viem/chains';
import { Environment, getCurrentEnvironment } from './environment';

// The list of supported Chains for a given environment
export const SUPPORTED_CHAINS = new Map<Environment, Chain[]>([
  [Environment.localhost, [baseSepolia]],
  [Environment.development, [baseSepolia]],
  [Environment.staging, [base]],
  [Environment.production, [base]],
]);

/**
 * Gets the list of supported chains for a given environment.
 * Defaults to the current environment.
 * @param env
 */
export function getChainsForEnvironment(env?: Environment): Chain[] | undefined {
  if (!env) {
    env = getCurrentEnvironment();
  }
  return SUPPORTED_CHAINS.get(env);
}

export function getChainById(chainId: string) {
  const chains = getChainsForEnvironment();
  return chains?.find((c: Chain) => c.id === Number(chainId)) ?? null;
}
