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

    const callAction = async () => {
      try {
        let fetchedData;
        // Use cache only if actionKey is not empty
        if (actionKey) {
          fetchedData = await storageService.getData(actionKey);
        }

        // If no cached data or actionKey is empty, fetch new data
        if (!fetchedData) {
          fetchedData = await action();
          // Cache the data only if actionKey is not empty
          if (actionKey) {
            await storageService.setData(actionKey, fetchedData);
          }
        }

        if (isSubscribed) {
          setData(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    void callAction();

    return () => {
      isSubscribed = false;
    };
  }, [storageService, actionKey, action]);

  return data;
}
