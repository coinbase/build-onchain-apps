import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { Dialog } from '@radix-ui/themes';
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
  const network = useNetwork();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  // onClick handler function for the copy button
  const handleCopyAddress = useCallback(() => {
    navigator.clipboard
      .writeText(address as string)
      .then(() => {
        // set is copied
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

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
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
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
                <Dialog.Root>
                  <Dialog.Trigger>
                    <div className="flex items-center justify-center gap-3">
                      <button type="button">{getSlicedAddress(address)}</button>
                    </div>
                  </Dialog.Trigger>

                  <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>{getSlicedAddress(address)}</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      ~~~
                    </Dialog.Description>

                    <div className="flex justify-start gap-3">
                      <span className="md-1 text-sm font-bold">Network:</span>
                      <span className="font-regular md-1 text-sm">
                        {network.chain?.name} ({network.chain?.id})
                      </span>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <Dialog.Close onClick={handleCopyAddress}>
                        <button type="button">Copy Address</button>
                      </Dialog.Close>
                      <Dialog.Close onClick={handleDisconnectWallet}>
                        <button type="button">Disconnect</button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
