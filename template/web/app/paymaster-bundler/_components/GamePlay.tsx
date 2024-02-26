import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { SymbolIcon } from '@radix-ui/react-icons';
import { SmartAccountClient } from 'permissionless';
import { PublicClient, encodeFunctionData } from 'viem';
import { sepolia } from 'viem/chains';
import NextImage from '@/components/NextImage/NextImage';
import createNFTMap from '../_utils/createNFTMap';
import fetchNFTs from '../_utils/fetchNFTs';
import { OwnedTokensType } from '../types';
import { nftAbi } from './abi';

type GameplayProps = {
  setOwnedTokens: Dispatch<SetStateAction<OwnedTokensType>>;
  smartAccount?: SmartAccountClient;
  client?: PublicClient;
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

export default function GamePlay({ setOwnedTokens, smartAccount, client }: GameplayProps) {
  const [loading, setLoading] = useState(false);
  const { login, authenticated, ready } = usePrivy();

  const handleOpenBox = useCallback(() => {
    void (async () => {
      setLoading(true);
      if (!smartAccount) return;
      if (!smartAccount.account) return;
      if (!client) return;

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

        const tokens = await fetchNFTs(smartAccount, client);
        const tokenMap = createNFTMap(tokens);

        setOwnedTokens(tokenMap);
        setLoading(false);
      } catch (e) {
        console.log('Privy: Error sending transaction', e);
        setLoading(false);
      }
    })();
  }, [smartAccount, client, setOwnedTokens]);

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
                className="flex w-full items-center justify-center rounded-full border border-boat-color-orange py-4 hover:bg-gray-800"
                onClick={handleOpenBox}
              >
                {loading ? (
                  <>
                    <span className="mr-2">
                      <SymbolIcon width={15} height={15} />
                    </span>
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Open box</span>
                )}
              </button>
            ) : (
              <button
                type="button"
                className="block w-full rounded-full border border-boat-color-orange py-4 hover:bg-gray-800"
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
