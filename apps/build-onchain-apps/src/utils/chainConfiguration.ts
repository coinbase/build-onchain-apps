import { baseGoerli, Chain, base } from 'viem/chains';
import { getCurrentEnvironment } from './configuration';
import { Environment } from './environment';

// The list of supported Chains for a given environment (e.g. Dev should only have testnet)
export const supportedChains = new Map<Environment, Chain[]>([
  [Environment.localhost, [baseGoerli]],
  [Environment.development, [baseGoerli]],
  [Environment.staging, [base]],
  [Environment.production, [base]],
]);

/**
 * Gets the list of supported chains for a given environment.  Defaults to the current environment.
 * @param env
 */
export function getChainsForEnvironment(env?: Environment): Chain[] | undefined {
  if (!env) {
    env = getCurrentEnvironment();
  }
  return supportedChains.get(env);
}

export function getChainById(chainId: string) {
  const chains = getChainsForEnvironment();
  return chains?.find((c: Chain) => c.id === Number(chainId)) ?? null;
}
