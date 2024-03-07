import React, { useEffect, useState } from 'react';
import { useWallets, ConnectedWallet, usePrivy } from '@privy-io/react-auth';

import {
  SmartAccountClient,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from 'permissionless';
import { signerToSimpleSmartAccount } from 'permissionless/accounts';
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { PublicClient, WalletClient, createWalletClient, custom } from 'viem';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains'; // Replace this with the chain used by your application
import createNFTMap from '../_utils/createNFTMap';
import fetchNFTs from '../_utils/fetchNFTs';
import { rpcUrl, paymasterUrl, entryPoint, factoryAddress, ALL_ITEMS } from '../constants';

import { OwnedTokensType } from '../types';
import GamePlay from './GamePlay';
import Header from './Header';
import Item from './Item';
import Vault from './Vault';

export default function PaymasterBundlerDemo() {
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();

  const [activeWallet, setActiveWallet] = useState<ConnectedWallet | undefined>();
  const [client, setPublicClient] = useState<PublicClient | undefined>();
  const [privyClient, setPrivyClient] = useState<WalletClient | undefined>();
  const [smartAccount, setSmartAccount] = useState<SmartAccountClient | undefined>();
  const [ownedTokens, setOwnedTokens] = useState<OwnedTokensType>({});
  const [showSponsoredModal, setShowSponsoredModal] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [mintedItem, setMintedItem] = useState<number>(0);

  // Fetch the NFTs
  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!smartAccount) return;
      if (!client) return;

      const tokens = await fetchNFTs(smartAccount, client);
      if (!tokens) return;
      const tokenMap = createNFTMap(tokens);

      setOwnedTokens(tokenMap);
    };

    if (authenticated) {
      void fetchOwnedNFTs();
    }
  }, [smartAccount, client, authenticated]);

  // Fetch the active wallet
  useEffect(() => {
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    setActiveWallet(embeddedWallet);
  }, [wallets]);

  // Fetch the privy client
  useEffect(() => {
    const fetchPrivyClient = async () => {
      if (!activeWallet) return;

      try {
        const eip1193provider = await activeWallet.getEthereumProvider();

        const walletClient = createWalletClient({
          account: activeWallet.address as `0x${string}`,
          chain: sepolia, // Replace this with the chain used by your application
          transport: custom(eip1193provider),
        });

        setPrivyClient(walletClient);
      } catch (error) {
        console.error('Error initializing privyClient:', error);
      }
    };

    void fetchPrivyClient();
  }, [activeWallet]);

  // Create the smart account
  useEffect(() => {
    const createSmartAccount = async () => {
      if (!privyClient) return;

      //@ts-expect-error Privy client makes Account optional whereas walletClientToSmartAccountSigner expects an Account causing type mismatch
      const signer = walletClientToSmartAccountSigner(privyClient);

      const publicClient = createPublicClient({
        chain: sepolia, // Replace this with the chain of your app
        transport: http(rpcUrl),
      });

      setPublicClient(publicClient);

      const simpleSmartAccountClient = await signerToSimpleSmartAccount(publicClient, {
        entryPoint: entryPoint,
        signer: signer,
        factoryAddress: factoryAddress,
      });

      const cloudPaymaster = createPimlicoPaymasterClient({
        transport: http(paymasterUrl),
      });

      const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccountClient,
        chain: sepolia, // or whatever chain you are using
        transport: http(rpcUrl),
        sponsorUserOperation: cloudPaymaster.sponsorUserOperation, // if using a paymaster
      });

      setSmartAccount(smartAccountClient);
    };

    void createSmartAccount();
  }, [privyClient]);

  return (
    <div className="mb-10 rounded-xl border border-boat-color-palette-line">
      <Header />
      <div className="relative lg:flex">
        <Vault ownedTokens={ownedTokens} />
        <GamePlay
          setOwnedTokens={setOwnedTokens}
          setShowSponsoredModal={setShowSponsoredModal}
          setTransactionHash={setTransactionHash}
          setMintedItem={setMintedItem}
          smartAccount={smartAccount}
          client={client}
        />
        {showSponsoredModal && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-700 h-700 relative z-10 rounded-2xl border border-gray-600 bg-black p-6 shadow-lg">
              <button
                type="button"
                className="absolute right-3 top-2 text-white"
                onClick={() => setShowSponsoredModal(false)}
              >
                X
              </button>
              <div className="mb-5 flex flex-col items-center">
                <Item
                  src={ALL_ITEMS[mintedItem].image}
                  altText={ALL_ITEMS[mintedItem].name}
                  className="mx-auto my-auto mb-5 max-h-[100px] max-w-[100px]"
                />
                <p>{ALL_ITEMS[mintedItem].name}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-green-400">NFT mint successfully sponsored!</p>
                <p className="text-sm">{ALL_ITEMS[mintedItem].name} added to your vault.</p>
                <button
                  type="button"
                  className="mt-5 block w-full rounded-full border border-boat-color-orange py-4 hover:bg-gray-800"
                  onClick={() => window.open(`https://sepolia.basescan.org/tx/${transactionHash}`)}
                >
                  <div className="flex justify-center">
                    <span>View on Basescan</span>
                    <img
                      src="/account_abstraction/etherscan.png"
                      alt="Etherscan"
                      className="mb-1 ml-2 mt-1 h-5 w-5"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
