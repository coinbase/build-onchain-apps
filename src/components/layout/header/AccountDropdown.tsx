import { Avatar } from '@coinbase/onchainkit/identity';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { useAccount } from 'wagmi';
import { AccountInfoPanel } from './AccountInfoPanel';

const DropdownMenuContentStyle = {
  marginTop: '-22px',
};

export function AccountDropdown() {
  const { address } = useAccount();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex h-8 w-8 items-center justify-center">
          {address && (
            <button type="button" aria-label="Disconnect">
              <Avatar address={address} />
            </button>
          )}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={40}
          className={clsx(
            'h-42 inline-flex w-60 flex-col items-start justify-start',
            'rounded-lg bg-neutral-900 bg-opacity-90 px-6 pb-2 pt-6 shadow backdrop-blur-2xl',
          )}
          style={DropdownMenuContentStyle}
        >
          <AccountInfoPanel />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
