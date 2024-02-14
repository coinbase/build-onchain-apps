import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

type BlockNumberResponse = {
  block: number;
};

const useCurrentBlockNumber = (refreshIntervalMs = 10000) => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { chain } = useAccount();
  const chainId = chain?.id;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchBlockNumber = async () => {
      if (!chainId) {
        setBlockNumber(0);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/chain/currentBlockNumber?chainId=${chainId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = (await response.json()) as BlockNumberResponse;
        setBlockNumber(data.block);
      } catch (err) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    // Refresh current block number every 15 seconds.
    const fetchBlockNumberWrapper = () => {
      fetchBlockNumber().catch(console.error); // Handle promise rejection
    };
    // TODO: Implement a shared state or other mechanism to prevent overloading the backend with multiple intervals.
    intervalId = setInterval(fetchBlockNumberWrapper, refreshIntervalMs);
    void fetchBlockNumber();

    return () => {
      clearInterval(intervalId); // Clear interval on cleanup
    };
  }, [chainId, refreshIntervalMs]);

  return { isLoading, blockNumber };
};

export default useCurrentBlockNumber;
