import { useCallback, useEffect, useState } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit';
import { ExitIcon } from '@radix-ui/react-icons';
import { Address, Chain, formatEther } from 'viem';
import { useAccount, useDisconnect } from 'wagmi';
import { getSlicedAddress } from '@/utils/address';
import { getRpcProviderForChain } from '@/utils/provider';

const getBalance = async (address: Address, chain: Chain): Promise<bigint> => {
  try {
    return await getRpcProviderForChain(chain).getBalance({
      address,
    });
  } catch (err) {
    return 0n;
  }
};

export function AccountInfoPanel() {
  const { address, chain } = useAccount();
  const [balance, setBalance] = useState<bigint>(0n);

  useEffect(() => {
    if (address && chain) {
      getBalance(address, chain)
        .then((result) => setBalance(result))
        .catch((error) => console.error(error));
    }
  }, [address, chain]);

  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  if (!address) return null;

  return (
    <>
      <div className="my-4 inline-flex items-center justify-start gap-2">
        <Avatar address={address} className="h-10 w-10 rounded-full" />
        <div className="inline-flex flex-col items-start justify-center gap-1">
          <div className="font-inter w-32 text-base font-medium text-white">
            <Name address={address} />
          </div>
          <span className="font-inter w-32 text-sm font-medium text-zinc-400">
            {getSlicedAddress(address)}
          </span>
        </div>
      </div>
      <hr className="h-px self-stretch border-transparent bg-zinc-400 bg-opacity-20" />
      <div className="inline-flex flex-col py-4">
        <span className="font-inter w-32 text-sm font-medium text-zinc-400">{chain?.name}</span>
        <span className="font-inter w-32 text-base font-medium text-white">
          {/* TODO: replace with OnchainKit component */}
          {parseFloat(formatEther(balance)).toFixed(3)}
          {' ETH'}
        </span>
      </div>
      <hr className="h-px self-stretch border-transparent bg-zinc-400 bg-opacity-20" />
      <button
        type="button"
        aria-label="Disconnect"
        className="my-4 inline-flex items-center justify-between self-stretch"
        onClick={handleDisconnectWallet}
      >
        <span className="font-inter w-32 text-left text-base font-medium text-white">Log out</span>
        <ExitIcon className="relative h-4 w-4" />
      </button>
    </>
  );
}
