import { useEffect, useState } from 'react';

import { StorageInterface, ActionFunction, ActionResponse, ActionKey } from '../types';

/**
 * A generic hook to fetch and store data using a specified storage service.
 * It fetches data based on the given dependencies and stores it using the provided storage service.
 */

export function useOnchainActionWithCache(
  action: ActionFunction,
  actionKey: ActionKey,
  storageService: StorageInterface,
) {
  const [data, setData] = useState<ActionResponse>(undefined);

  useEffect(() => {
    let isSubscribed = true;

    const checkAndFetchData = async () => {
      try {
        const cachedData = await storageService.getData(actionKey);

        if (cachedData && isSubscribed) {
          setData(cachedData);
        } else {
          const fetchedData = await action();
          await storageService.setData(actionKey, fetchedData);
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
  }, [storageService, actionKey, action]);

  return data;
}
