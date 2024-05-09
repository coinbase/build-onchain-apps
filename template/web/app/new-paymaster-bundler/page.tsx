'use client';

import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
// import Guide from './_components/Guide';
import NewPaymasterBundlerApp from './_components/NewPaymasterBundlerApp';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function NewPaymasterBundlerPage() {
  return (
    <>
      <Header />
      <Main>
        <Banner pageName="New Paymaster Bundler" pageUrl="new-paymaster-bundler" wip />
        <NewPaymasterBundlerApp />
        {/* <Guide /> */}
      </Main>
      <Footer />
    </>
  );
}
