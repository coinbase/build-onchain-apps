import { useCallback } from 'react';
import { PrivyProvider, User } from '@privy-io/react-auth';
import { privyID } from '../constants';
import PaymasterBundlerDemo from './PaymasterBundlerDemo';

export default function PaymasterBundlerApp() {
  const handleLogin = useCallback((user: User) => {
    console.log(`Successfully authenticated with Privy! Your User ID: ${user.id}`);
  }, []);

  if (!privyID) return null;

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
