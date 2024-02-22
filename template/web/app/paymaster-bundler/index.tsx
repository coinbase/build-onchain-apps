'use client';

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
          <PaymasterBundlerDemo />
        </section>
        <section className="container px-8">
          <Guide />
        </section>
      </main>
      <Footer />
    </>
  );
}
