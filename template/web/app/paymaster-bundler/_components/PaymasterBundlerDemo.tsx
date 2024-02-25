import React, { useEffect, useState } from 'react';
import { useWallets, ConnectedWallet } from '@privy-io/react-auth';

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
import fetchNFTs from '../_utils/fetchNFTs';
import { rpcUrl, paymasterUrl, entryPoint, factoryAddress } from '../constants';
import { nftAbi } from './abi';

import GamePlay from './GamePlay';
import Header from './Header';
import Vault from './Vault';

export default function PaymasterBundlerDemo() {
  const { wallets } = useWallets();

  const [activeWallet, setActiveWallet] = useState<ConnectedWallet | undefined>();
  const [client, setPublicClient] = useState<PublicClient | undefined>();
  const [privyClient, setPrivyClient] = useState<WalletClient | undefined>();
  const [smartAccount, setSmartAccount] = useState<SmartAccountClient | undefined>();
  const [ownedTokens, setOwnedTokens] = useState<string[]>([]);

  console.log(ownedTokens);

  // Fetch the NFTs
  useEffect(() => {
    const fetchOwnedNFTs = async () => {
      if (!smartAccount) return;
      if (!client) return;

      const tokens = await fetchNFTs(smartAccount, client);

      setOwnedTokens(tokens);
    };

    void fetchOwnedNFTs();
  }, [smartAccount, client]);

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
      <div className="lg:flex">
        <Vault />
        <GamePlay smartAccount={smartAccount} />
      </div>
    </div>
  );
}
