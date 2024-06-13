import { useState, useMemo, useCallback } from 'react';
import { useReadContract } from 'wagmi';
import { markStep } from '@/utils/analytics';
import { useBuyMeACoffeeContract } from '../_contracts/useBuyMeACoffeeContract';
import type { CoffeeMemo } from '../_components/types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos, a function to refetch them, and paging functions.
 */
function useOnchainCoffeeMemos(pageSize: number = 5) {
  const contract = useBuyMeACoffeeContract();
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMemosArgs: [bigint, bigint] = [BigInt(currentPage * pageSize), BigInt(pageSize)];

  markStep('useReadContract.refetchMemos');
  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getMemos',
    args: fetchMemosArgs,
  });
  markStep('useReadContract.refetchMemos');

  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  }, []);

  return useMemo(
    () => ({
      memos:
        contractReadResult.status === 'success' ? (contractReadResult.data as CoffeeMemo[]) : [],
      refetchMemos: contractReadResult.refetch,
      currentPage,
      goToNextPage,
      goToPreviousPage,
      pageSize,
    }),
    [contractReadResult, currentPage, goToNextPage, goToPreviousPage],
  );
}

export default useOnchainCoffeeMemos;
