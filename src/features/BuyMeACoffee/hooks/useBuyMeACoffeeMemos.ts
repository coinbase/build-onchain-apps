import { contractAddress, contractABI } from '../contract/contractInfo';
import { useContractRead } from 'wagmi';

import type { Memo } from '../types';

function useBuyMeACoffeeMemos() {
  // Below is a very basic example of how to call a read-only function on a contract (with no arguments).
  // The BuyMeACoffee-Contracts contract  https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts
  const { data, refetch: refetchMemos } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: 'getMemos',
  });

  return {
    memos: (data ?? []) as Memo[],
    refetchMemos,
  };
}

export default useBuyMeACoffeeMemos;
