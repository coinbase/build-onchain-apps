import { useCallback, useState } from 'react';
import { useContractRead } from 'wagmi';
import { contractAddress, contractABI } from '../contract/contractInfo';

import type { CoffeeMemo } from '@/types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainCoffeeMemos() {
  const [memos, setMemos] = useState<CoffeeMemo[]>([]);

  const handleSuccess = useCallback((newMemos: CoffeeMemo[]) => {
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

export { useOnchainCoffeeMemos };
