import { baseSepolia } from 'viem/chains';
import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi';
import { AccountDropdown } from './AccountDropdown';
import { AccountInfoPanel } from './AccountInfoPanel';

/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const account = useAccount();
  const { connectors, connect, status } = useConnect();
  const { disconnect } = useDisconnect();
  const connector = connectors[0];
  const chainId = useChainId();

  return (
    <div
      className="flex flex-grow"
      {...(status === 'pending' && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return (
            <button
              onClick={() => connect({ connector })}
              type="button"
              className="inline-flex h-10 flex-grow items-center justify-center gap-2 rounded-3xl bg-white px-4 py-2"
            >
              <div className="text-sm font-medium leading-normal text-black">Connect wallet</div>
            </button>
          );
        }

        if (account.status === 'connected' && chainId !== baseSepolia.id) {
          return (
            <button onClick={() => disconnect()} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="flex flex-grow flex-col md:hidden">
              <AccountInfoPanel />
            </div>
            <div className="flex hidden md:block">
              <AccountDropdown />
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
