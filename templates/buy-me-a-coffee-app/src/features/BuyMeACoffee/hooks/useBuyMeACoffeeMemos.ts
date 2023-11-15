import { useCallback, useState } from 'react';
import { contractAddress, contractABI } from '../contract/contractInfo';
import { useContractRead } from 'wagmi';

import type { Memo } from '../types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useBuyMeACoffeeMemos() {
  const [memos, setMemos] = useState<Memo[]>([]);

  const handleSuccess = useCallback((newMemos: Memo[]) => {
    setMemos(newMemos);
  }, []);

  // Below is a very basic example of how to call a read-only function on a contract (with no arguments).
  // The BuyMeACoffee-Contracts contract  https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts
  const { refetch: refetchMemos } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: 'getMemos',
    onSuccess: handleSuccess,
  });

  return {
    memos,
    refetchMemos,
  };
}

export { useBuyMeACoffeeMemos };
