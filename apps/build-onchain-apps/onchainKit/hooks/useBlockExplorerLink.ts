import { useEffect, useState } from 'react';
import { Chain } from 'viem/chains';

export enum HashType {
  Address = 'address',
  Transaction = 'tx',
}
/**
 * A React hook to generate an BlockExplorer (e.g. etherscan) link.
 * @param {Object} chain - The chain object from wagmi.
 * @param {string} hash - The contract or transaction hash.
 * @returns {string} - The URL to the Etherscan page for the given hash.
 */
export function useBlockExplorerLink(
  chain: Chain,
  hash: string | undefined,
  type: HashType = HashType.Address,
) {
  const [link, setLink] = useState('');

  useEffect(() => {
    if (chain?.blockExplorers && hash) {
      const explorerUrl = chain.blockExplorers?.default.url;
      setLink(`${explorerUrl}/${type.toString()}/${hash}`);
    }
  }, [chain, hash, type]);

  return link;
}
