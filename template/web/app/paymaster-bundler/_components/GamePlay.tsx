import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ReloadIcon, SymbolIcon } from '@radix-ui/react-icons';
import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import { SmartAccountClient } from 'permissionless';
import { PublicClient, encodeFunctionData } from 'viem';
import { sepolia } from 'viem/chains';
import Button from '@/components/Button/Button';
import NextImage from '@/components/NextImage/NextImage';
import { usePaymasterBundlerContract } from '../_contracts/usePaymasterBundlerContract';
import createNFTMap from '../_utils/createNFTMap';
import fetchNFTs from '../_utils/fetchNFTs';
import { ALL_ITEMS, contractAddress } from '../constants';
import { NFTType, OwnedTokensType } from '../types';

type GameplayProps = {
  setOwnedTokens: Dispatch<SetStateAction<OwnedTokensType>>;
  setShowSponsoredModal: Dispatch<SetStateAction<boolean>>;
  setTransactionHash: Dispatch<SetStateAction<string>>;
  setMintedItem: Dispatch<SetStateAction<number>>;
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
    randomNumber = Math.ceil(randomValue * 3);
  }
  return randomNumber;
};

export default function GamePlay({
  setOwnedTokens,
  setShowSponsoredModal,
  setTransactionHash,
  setMintedItem,
  smartAccount,
  client,
}: GameplayProps) {
  const [loading, setLoading] = useState(false);
  const { login, authenticated, ready } = usePrivy();
  const [mintedNFT, setMintedNFT] = useState<NFTType | null>(null);
  const [flipped, setFlipped] = useState(false);
  const contract = usePaymasterBundlerContract();

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
        abi: contract.abi,
        functionName: 'mintTo',
        args: [smartAccount.account?.address, randomNumber],
      });

      try {
        const txHash = await smartAccount.sendTransaction({
          to: contractAddress,
          data: data,
          value: BigInt(0),
          account: smartAccount.account,
          chain: sepolia,
        });

        const tokens = await fetchNFTs(smartAccount, client);
        if (!tokens) return;
        const tokenMap = createNFTMap(tokens);

        setOwnedTokens(tokenMap);
        setLoading(false);
        setMintedNFT(ALL_ITEMS[randomNumber]);
        setFlipped(true);
        setMintedItem(randomNumber);
        setTransactionHash(txHash);
        setShowSponsoredModal(true);
      } catch (e) {
        console.log('Privy: Error sending transaction', e);
        setLoading(false);
      }
    })();
  }, [smartAccount, client, setOwnedTokens, setShowSponsoredModal]);

  const handleRestart = useCallback(() => {
    setMintedNFT(null);
    setFlipped(false);
  }, []);

  useEffect(() => {
    if (!authenticated) {
      handleRestart();
      setOwnedTokens({});
    }
  }, [authenticated, handleRestart, setOwnedTokens]);

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
                    buttonContent="Open new box"
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
                          <SymbolIcon width={15} height={15} className="animate-spin" />
                        </span>
                        <span>Minting</span>
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
