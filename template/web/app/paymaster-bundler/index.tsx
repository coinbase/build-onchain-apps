'use client';

import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import HorizontalLine from '@/components/horizontal-line/HorizontalLine';
import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Guide from './_components/Guide';
import PaymasterBundlerDemo from './_components/PaymasterBundlerDemo';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function PaymasterBundlerPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex flex-col py-6">
        <section className="container px-8">
          <Banner pageName="Paymaster Bundler" pageUrl="paymaster-bundler" />
        </section>
        <HorizontalLine />
        <section className="container px-8">
          <PrivyProvider
            appId="clsxnba7r00tragoglekx9or7" // put this in an .env
            onSuccess={handleLogin}
            config={{
              embeddedWallets: {
                createOnLogin: 'users-without-wallets', // or 'all-users'
              },
              loginMethods: ['email', 'wallet'],
              appearance: {
                theme: 'dark',
                accentColor: '#676FFF',
                logo: 'https://images.ctfassets.net/c5bd0wqjc7v0/3dFdY6GvgLgCIXmBiN6eiA/d4acc5d4c5d557566cf0e46f9b58de43/icon-buy-and-sell.svg',
              },
            }}
          >
            <PaymasterBundlerDemo />
          </PrivyProvider>
        </section>
        <section className="container px-8">
          <Guide />
        </section>
      </main>
      <Footer />
    </>
  );
}
