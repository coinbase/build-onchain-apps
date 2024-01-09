import { useCallback, useState } from 'react';
import { useContractRead } from 'wagmi';
import { markStep } from '../utils/analytics';
import { useBuyMeACoffeeContract } from './contracts';

import type { CoffeeMemo } from '../types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainCoffeeMemos() {
  // TODO: this state should be cleared on network change, otherwise memos from multiple chains
  // could end up in the same list
  const [memos, setMemos] = useState<CoffeeMemo[]>([]);

  const handleSuccess = useCallback((newMemos: CoffeeMemo[]) => {
    setMemos(newMemos);
  }, []);

  const contract = useBuyMeACoffeeContract();

  // Below is a very basic example of how to call a read-only function on a contract (with no arguments).
  // The BuyMeACoffee-Contracts contract  https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts
  markStep('useContractRead.refetchMemos');
  const { refetch: refetchMemos } = useContractRead({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getMemos',
    onSuccess: handleSuccess,
  });
  markStep('useContractRead.refetchMemos');

  return {
    memos,
    refetchMemos,
  };
}

export default useOnchainCoffeeMemos;
