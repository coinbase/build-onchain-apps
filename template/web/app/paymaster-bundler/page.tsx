'use client';

import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Guide from './_components/Guide';
import PaymasterBundlerApp from './_components/PaymasterBundlerApp';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function PaymasterBundlerPage() {
  return (
    <>
      <Header />
      <Main>
        <Banner pageName="Paymaster Bundler" pageUrl="paymaster-bundler" wip />
        <PaymasterBundlerApp />
        <Guide />
      </Main>
      <Footer />
    </>
  );
}
