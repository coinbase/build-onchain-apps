import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ReloadIcon, SymbolIcon } from '@radix-ui/react-icons';
import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import { SmartAccountClient } from 'permissionless';
import { PublicClient, encodeFunctionData } from 'viem';
import { sepolia } from 'viem/chains';
import Button from '@/components/Button/Button';
import NextImage from '@/components/NextImage/NextImage';
import createNFTMap from '../_utils/createNFTMap';
import fetchNFTs from '../_utils/fetchNFTs';
import { ALL_ITEMS } from '../constants';
import { NFTType, OwnedTokensType } from '../types';
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
  const [mintedNFT, setMintedNFT] = useState<NFTType | null>(null);
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleOpenBox = useCallback(() => {
    void (async () => {
      if (!smartAccount) return;
      if (!smartAccount.account) return;
      if (!client) return;

      setLoading(true);

      const randomNumber = getRandomNumber();

      const data = encodeFunctionData({
        abi: nftAbi,
        functionName: 'mintTo',
        args: [smartAccount.account?.address, randomNumber],
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
        setMintedNFT(ALL_ITEMS[randomNumber]);
        setFlipped(true);
      } catch (e) {
        console.log('Privy: Error sending transaction', e);
        setLoading(false);
      }
    })();
  }, [smartAccount, client, setOwnedTokens]);

  const handleRestart = useCallback(() => {
    setMintedNFT(null);
    setFlipped(false);
  }, []);

  return (
    <div className="w-full px-10 py-10">
      <animated.div
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          display: flipped ? 'none' : 'block',
        }}
      >
        <NextImage
          src="/account_abstraction/mystery_box.png"
          altText="Mystery Box"
          className="block rounded-2xl"
        />
      </animated.div>

      <animated.div
        style={{
          opacity,
          transform,
          rotateX: '180deg',
          display: flipped ? 'block' : 'none',
        }}
      >
        <NextImage
          src={mintedNFT?.image ?? ''}
          altText={mintedNFT?.name ?? ''}
          className="block rounded-2xl"
        />
      </animated.div>

      {mintedNFT ? (
        <div className="my-4 text-center text-violet-200">Rarity score: {mintedNFT.rarity}</div>
      ) : null}

      {mintedNFT ? (
        <h1 className="text-center text-2xl">{mintedNFT.name}</h1>
      ) : (
        <h1 className="mt-6 text-center text-2xl">Athena Mystery Box</h1>
      )}

      {ready ? (
        <div className={clsx(mintedNFT ? 'mt-2' : 'mt-8')}>
          <div className="mx-auto max-w-[130px]">
            {/* TODO: Make this a button variant */}
            {authenticated ? (
              <div>
                {mintedNFT ? (
                  <Button
                    buttonContent="Restart demo"
                    onClick={handleRestart}
                    variant="secondary"
                    icon={<ReloadIcon width={15} height={15} />}
                  />
                ) : (
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
                )}
              </div>
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
