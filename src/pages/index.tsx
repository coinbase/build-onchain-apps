import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIsMounted } from '../hooks/useIsMounted';
import { BuyMeACoffeeMemos } from '@/features/BuyMeACoffee';

export default function Home() {
  const isMounted = useIsMounted();
  // Prevent hydration errors by waiting to render content dependent on connection status.
  // See: https://github.com/wagmi-dev/wagmi/issues/542
  if (!isMounted) {
    return null;
  }

  return (
    <main className={'flex min-h-screen flex-col items-center p-24'}>
      <div className="z-10 max-w-5xl w-full items-center justify-end font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ConnectButton />
        </div>
      </div>

      <BuyMeACoffeeMemos />
    </main>
  );
}
