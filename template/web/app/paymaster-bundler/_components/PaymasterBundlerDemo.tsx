import { useWallets, usePrivy } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains'; // Replace this with the chain used by your application
import { createWalletClient, custom } from 'viem';
import React, { useEffect, useState } from 'react';

import { createSmartAccountClient, walletClientToSmartAccountSigner } from "permissionless";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createPublicClient, http } from "viem";

import GamePlay from './GamePlay';
import Header from './Header';
import Vault from './Vault';

// constants
const rpcUrl = "https://api.developer.coinbase.com/rpc/v1/base-sepolia/Nz9nSdr8uIY7HhIi2zRrJFgISslFF2In"
const paymasterUrl = "https://api.developer.coinbase.com/rpc/v1/base-sepolia/Nz9nSdr8uIY7HhIi2zRrJFgISslFF2In"
const entryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
const factoryAddress = "0x9406Cc6185a346906296840746125a0E44976454"

export default function PaymasterBundlerDemo() {
  const { login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [activeWallet, setActiveWallet] = useState<any>(null);
  const [privyClient, setPrivyClient] = useState<any>(null);
  const [smartAccount, setSmartAccount] = useState<any>(null);

  // Fetch the active wallet
  useEffect(() => {
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    setActiveWallet(embeddedWallet);
  }, [wallets]);

  // Fetch the privy client
  useEffect(() => {
    const fetchPrivyClient = async () => {
      try {
        const eip1193provider = await activeWallet.getEthereumProvider();
        const client = createWalletClient({
          account: activeWallet.address as `0x${string}`,
          chain: sepolia, // Replace this with the chain used by your application
          transport: custom(eip1193provider)
        });

        setPrivyClient(client);
      } catch (error) {
        console.error('Error initializing privyClient:', error);
      }
    };

    if (!activeWallet) return;
    void fetchPrivyClient();
  }, [activeWallet]);


  // Create the smart account
  useEffect(() => {
    const createSmartAccount = async () => {
      const signer = walletClientToSmartAccountSigner(privyClient)
      const publicClient = createPublicClient({
        chain: sepolia, // Replace this with the chain of your app
        transport: http(rpcUrl),
      })

      const simpleSmartAccountClient = await signerToSimpleSmartAccount(publicClient, {
        entryPoint: entryPoint,
        signer: signer,
        factoryAddress: factoryAddress
      })
      const cloudPaymaster = createPimlicoPaymasterClient({
        transport: http(paymasterUrl),
      })
      const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccountClient,
        chain: sepolia, // or whatever chain you are using
        transport: http(rpcUrl),
        sponsorUserOperation: cloudPaymaster.sponsorUserOperation // if using a paymaster
      })
      setSmartAccount(smartAccountClient);
    }

    if (!privyClient) return
    void createSmartAccount();
  }, [privyClient])


  return (
    <div className="mb-10 rounded-xl border border-boat-color-palette-line">
      <button
        type="button"
        className="block w-full rounded-full border border-boat-color-orange py-4"
        onClick={login}
      >
        Login
      </button>
      <button
        type="button"
        className="block w-full rounded-full border border-boat-color-orange py-4"
        onClick={logout}
      >
        Logout
      </button>
      <Header />
      <div className="lg:flex">
        <Vault />
        <GamePlay smartAccount={smartAccount} />
      </div>
    </div>
  );
}
