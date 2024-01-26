import { useAccount, useBalance } from 'wagmi';

/**
 * Utility to see if an address balance can afford to transact for a certain amount
 *
 * @param address address of user to check balance for
 * @param amount amount to check if user can afford
 * @returns {boolean}
 */
export function useAddressCanAfford(address: `0x${string}`, amount: bigint) {
  const result = useBalance({
    address,
  });

  if (!result.data) return false;

  return amount <= result.data.value;
}

/**
 * Utility to see if the current logged in user can afford to transact for a certain amount
 *
 * @param address address of user to check balance for
 * @param amount amount to check if user can afford
 * @returns {boolean}
 */
export function useLoggedInUserCanAfford(amount: bigint) {
  const account = useAccount();

  return useAddressCanAfford(account.address as `0x${string}`, amount);
}
