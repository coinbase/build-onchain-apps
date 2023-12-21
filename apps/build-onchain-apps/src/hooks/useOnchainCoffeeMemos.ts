import { useCallback, useState } from 'react';
import { useContractRead } from 'wagmi';
import { baseGoerli } from 'viem/chains';
import { contract } from '../contract/ContractSpecification';
import { markStep } from '../utils/analytics';

import type { CoffeeMemo } from '../types';

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
  markStep('useContractRead.refetchMemos');
  const { refetch: refetchMemos } = useContractRead({
    // TODO: the chainId should be dynamic
    address: contract.buyMeACoffee[baseGoerli.id].address,
    abi: contract.buyMeACoffee.abi,
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
