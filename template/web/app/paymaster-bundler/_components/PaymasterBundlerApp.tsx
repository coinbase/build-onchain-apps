'use client';

import { useCallback } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { privyID } from '../constants';
import PaymasterBundlerDemo from './PaymasterBundlerDemo';

export default function PaymasterBundlerApp() {
  const handleLogin = useCallback(() => {
    console.log('Successfully authenticated with Privy!');
  }, []);

  if (privyID?.length !== 25) return null;

  return (
    <PrivyProvider
      appId={privyID ?? 'not-set'}
      onSuccess={handleLogin}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // or 'all-users'
        },
        loginMethods: ['email'],
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: 'https://images.ctfassets.net/c5bd0wqjc7v0/3dFdY6GvgLgCIXmBiN6eiA/d4acc5d4c5d557566cf0e46f9b58de43/icon-buy-and-sell.svg',
        },
      }}
    >
      <PaymasterBundlerDemo />
    </PrivyProvider>
  );
}
