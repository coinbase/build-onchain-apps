import { useReadContract } from 'wagmi';
import { CoffeeMemo } from '../types';
import { markStep } from '../utils/analytics';
import { useBuyMeACoffeeContract } from './contracts';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainCoffeeMemos() {
  const contract = useBuyMeACoffeeContract();

  // Below is a very basic example of how to call a read-only function on a contract (with no arguments).
  // The BuyMeACoffee-Contracts contract  https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts
  markStep('useContractRead.refetchMemos');
  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getMemos',
  });
  markStep('useContractRead.refetchMemos');

  return {
    memos: contractReadResult.status === 'success' ? (contractReadResult.data as CoffeeMemo[]) : [],
    result: contractReadResult,
  };
}

export default useOnchainCoffeeMemos;
