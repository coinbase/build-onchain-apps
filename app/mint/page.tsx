'use client';

import dynamic from 'next/dynamic';
import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import Guide from './_components/Guide';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const MintContractDemo = dynamic(
  async () => import('app/mint/_components/ContractDemo').then((mod) => mod),
  {
    ssr: false,
  },
);

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function MintPage() {
  return (
    <>
      <Header />
      <Main>
        <Banner pageName="Mint NFT" pageUrl="mint" />
        <MintContractDemo />
        <Guide />
      </Main>
      <Footer />
    </>
  );
}
