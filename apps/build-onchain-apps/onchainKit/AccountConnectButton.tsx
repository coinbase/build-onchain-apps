import { useAccount, useDisconnect } from 'wagmi';
import { useCallback } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getSlicedAddress } from './utils/address';
import '@rainbow-me/rainbowkit/styles.css';

/**
 * TODO Docs
 */
export function AccountConnectButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="inline-flex h-10 w-36 items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2"
                  >
                    <div className="text-sm font-medium leading-normal text-black">
                      Connect wallet
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center justify-center gap-3">
                  <button type="button" onClick={handleDisconnectWallet}>
                    {getSlicedAddress(address)}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
