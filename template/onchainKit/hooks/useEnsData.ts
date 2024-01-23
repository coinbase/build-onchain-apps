import { useEffect, useState } from 'react';
import { GetEnsAvatarReturnType, GetEnsNameReturnType } from 'viem/ens';
import { StorageInterface } from '../types';
// The fetcher function type, which can receive multiple arguments
type FetcherFunction<T extends unknown[]> = (...args: T) => Promise<GetEnsNameReturnType | GetEnsAvatarReturnType | undefined>;

// useEnsData: A generic hook to fetch and store data using a specified storage service.
// It fetches data based on the given dependencies and stores it using the provided storage service.
export function useEnsData<T extends unknown[]>(
  fetcher: FetcherFunction<T>, 
  deps: T, 
  storageService: StorageInterface
) {
  const [data, setData] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let isSubscribed = true;

    const checkAndFetchData = async () => {
      try {
        const id = deps.join('-');
        const cachedData = await storageService.getData(id);

        if (cachedData && isSubscribed) {
          setData(cachedData);
        } else {
          const fetchedData = await fetcher(...deps);
          await storageService.setData(id, fetchedData);
          if (isSubscribed) setData(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching ENS data:', error);
      }
    };

    void checkAndFetchData();

    return () => {
      isSubscribed = false;
    };
  }, [fetcher, deps, storageService]);

  return data;
};