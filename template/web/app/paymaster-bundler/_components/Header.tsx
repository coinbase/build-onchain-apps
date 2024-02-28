import { useCallback } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import clsx from 'clsx';
import NextImage from '@/components/NextImage/NextImage';
import { roboto } from 'app/fonts';

const LIGHTNINGS = [1, 2, 3];

export default function Header() {
  const { logout, authenticated } = usePrivy();

  const handleLogout = useCallback(() => {
    void (async () => {
      await logout();
    })();
  }, [logout]);

  return (
    <div className="justify-between rounded-t-xl border border-x-0 border-t-0 border-boat-color-palette-line bg-boat-footer-dark-gray p-6 md:flex">
      <div className="flex items-center gap-3">
        <div>
          <NextImage
            src="/account_abstraction/knight.png"
            altText="Knight Logo"
            className="block h-[30px] w-[25px]"
          />
        </div>
        <h1 className={clsx('text-2xl text-boat-color-orange', roboto.className)}>
          KNIGHT WARRIORS
        </h1>
      </div>
      <div className="mt-2 flex items-center gap-4 md:mt-0">
        <div className="flex">
          {LIGHTNINGS.map((l) => {
            return (
              <NextImage
                key={`lightning-${l}`}
                src="/account_abstraction/lightning.png"
                altText="Lightning Bolt"
                className="block h-[24px] w-[24px]"
              />
            );
          })}
        </div>

        <div>
          <NextImage
            src="/account_abstraction/avatar.png"
            altText="Avatar"
            className="block h-[48px] w-[48px]"
          />
        </div>

        {authenticated ? (
          <div className="w-[100px]">
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full rounded-full border border-boat-color-orange py-2 hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
