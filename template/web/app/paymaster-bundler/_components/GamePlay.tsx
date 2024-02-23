import { useCallback } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { SmartAccountClient } from 'permissionless';
import { encodeFunctionData } from 'viem';
import { sepolia } from 'viem/chains';
import NextImage from '@/components/NextImage/NextImage';
import { nftAbi } from './abi';

type GameplayProps = {
  smartAccount?: SmartAccountClient;
};

const getRandomNumber = () => {
  let randomNumber;
  // Generate a random number between 0 and 3
  const randomValue = Math.random();
  if (randomValue < 0.25) {
    // 25% chance of getting 0
    randomNumber = 0;
  } else {
    // 75% chance of getting a number between 1 and 3
    randomNumber = Math.floor(randomValue * 3) + 1;
  }
  return randomNumber;
};

export default function GamePlay({ smartAccount }: GameplayProps) {
  const { login, authenticated, ready } = usePrivy();

  const handleOpenBox = useCallback(() => {
    void (async () => {
      if (!smartAccount) return;
      if (!smartAccount.account) return;

      const data = encodeFunctionData({
        abi: nftAbi,
        functionName: 'mintTo',
        args: [smartAccount.account?.address, getRandomNumber()],
      });

      try {
        await smartAccount.sendTransaction({
          to: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
          data: data,
          value: BigInt(0),
          account: smartAccount.account,
          chain: sepolia,
        });
      } catch (e) {
        console.log('Privy: Error sending transaction', e);
      }
    })();
  }, [smartAccount]);

  return (
    <div className="w-full px-10 py-10">
      <div>
        <NextImage
          src="/account_abstraction/mystery_box.png"
          altText="Mystery Box"
          className="block rounded-2xl"
        />
      </div>

      <div className="my-4 text-center text-violet-200">Rarity score: 501</div>

      <h1 className="text-center text-2xl">Athena Mystery Box</h1>

      {ready ? (
        <div className="mt-8">
          <div className="mx-auto max-w-[130px]">
            {/* TODO: Make this a button variant */}
            {authenticated ? (
              <button
                type="button"
                className="block w-full rounded-full border border-boat-color-orange py-4" //TODO: add disabled
                onClick={handleOpenBox}
              >
                Open box
              </button>
            ) : (
              <button
                type="button"
                className="block w-full rounded-full border border-boat-color-orange py-4"
                onClick={login}
              >
                Play
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
