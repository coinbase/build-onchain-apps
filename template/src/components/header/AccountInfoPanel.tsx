import { useCallback } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';
import { useAccount, useDisconnect } from 'wagmi';
import { OnchainAddress, OnchainAvatar, useEnsName } from '../../../onchainKit';

export function AccountInfoPanel() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { ensName } = useEnsName(address);
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div className="my-4 inline-flex items-center justify-start gap-2">
        <OnchainAvatar address={address} className="h-10 w-10 rounded-full" />
        <div className="inline-flex flex-col items-start justify-center gap-1">
          <div className="inline-flex items-center justify-start gap-1">
            <div className="font-inter w-32 text-base font-medium text-white">{ensName}</div>
          </div>
          <div className="inline-flex items-center justify-start gap-8">
            <div className="flex items-center justify-start gap-1">
              <OnchainAddress
                address={address}
                className="font-inter w-32 text-sm font-medium text-zinc-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-px self-stretch bg-zinc-400 bg-opacity-20" />
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
