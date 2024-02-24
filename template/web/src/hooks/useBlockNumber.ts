import { useQuery } from '@tanstack/react-query';
import { Chain } from 'viem/chains';
import { useAccount } from 'wagmi';

type BlockNumberResponse = {
  block: number;
};

type Props = {
  refetchInterval?: number;
  enabled?: boolean;
  chainId?: Chain['id'];
};

//TODO: consider using wagmi's `useBlockNumber` instead
const useCurrentBlockNumber = (props?: Props) => {
  const { refetchInterval = 10000, enabled = true, chainId } = props ?? {};
  const { chain } = useAccount();
  const chainIdFromArgumentOrConnectedWallet = chainId ?? chain?.id;

  return useQuery({
    queryKey: ['useCurrentBlockNumber', chainIdFromArgumentOrConnectedWallet],
    queryFn: async () => {
      if (!chainIdFromArgumentOrConnectedWallet) {
        return 0;
      }
      const response = await fetch(
        `/api/chain/currentBlockNumber?chainId=${chainIdFromArgumentOrConnectedWallet}`,
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = (await response.json()) as BlockNumberResponse;
      return data.block;
    },
    refetchInterval,
    enabled: enabled,
  });
};

export default useCurrentBlockNumber;
