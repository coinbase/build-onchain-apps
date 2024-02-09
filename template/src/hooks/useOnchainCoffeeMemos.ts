import { useReadContract } from 'wagmi';
import { CoffeeMemo } from '../types';
import { useBuyMeACoffeeContract } from './contracts';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainCoffeeMemos() {
  const contract = useBuyMeACoffeeContract();

  const result = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getMemos',
  });

  return {
    data: result.data as CoffeeMemo[],
    result,
  };
}

export default useOnchainCoffeeMemos;
