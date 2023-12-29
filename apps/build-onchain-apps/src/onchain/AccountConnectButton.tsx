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
    <div className="flex">
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
                      className="inline-flex h-10 w-32 items-center justify-center gap-2.5 rounded-3xl bg-white px-4 py-2"
                    >
                      <span className="text-sm font-medium leading-normal text-black">
                        Connect wallet
                      </span>
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="inline-flex h-10 w-32 items-center justify-center gap-2.5 rounded-3xl bg-white px-4 py-2"
                    >
                      <span className="text-sm font-medium leading-normal text-black">
                        Wrong network
                      </span>
                    </button>
                  );
                }

                return (
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <div className="flex">
                        <div className="inline-flex h-10 w-36 items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2">
                          <div className="text-sm font-medium leading-normal text-black">
                            {getSlicedAddress(address)}
                          </div>
                        </div>
                      </div>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                      <h4>{getSlicedAddress(address)}</h4>
                      <div className="flex">
                        <span className="text-bold">Network:</span>
                        <span>
                          {network.chain?.name} ({network.chain?.id})
                        </span>
                      </div>
                      <div className="flex">
                        <Dialog.Close onClick={handleCopyAddress}>
                          <div className="inline-flex h-10 w-36 items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2">
                            <div className="text-sm font-medium leading-normal text-black">
                              Copy Address
                            </div>
                          </div>
                        </Dialog.Close>
                        <Dialog.Close onClick={handleDisconnectWallet}>
                          <div className="inline-flex h-10 w-36 items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2">
                            <div className="text-sm font-medium leading-normal text-black">
                              Disconnect
                            </div>
                          </div>
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
    </div>
  );
}
