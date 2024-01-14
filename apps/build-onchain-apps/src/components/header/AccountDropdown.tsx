import { useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { OnchainAvatar } from '../../../onchainKit';

export function AccountDropdown() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <button type="button" aria-label="Disconnect" onClick={handleDisconnectWallet}>
        <OnchainAvatar address={address} />
      </button>
    </div>
  );
}
