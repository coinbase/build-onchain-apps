import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { markStep } from '@/utils/analytics';
import { useBuyMeACoffeeContract } from '../_contracts/useBuyMeACoffeeContract';
import type { CoffeeMemo } from '../_components/types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainCoffeeMemos() {
  const contract = useBuyMeACoffeeContract();

  markStep('useReadContract.refetchMemos');
  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getMemos',
    args: [BigInt(0), BigInt(25)], // TODO : Implement Paging
  });
  markStep('useReadContract.refetchMemos');

  return useMemo(
    () => ({
      memos:
        contractReadResult.status === 'success' ? (contractReadResult.data as CoffeeMemo[]) : [],
      refetchMemos: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useOnchainCoffeeMemos;
