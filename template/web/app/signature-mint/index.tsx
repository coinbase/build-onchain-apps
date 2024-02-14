'use client';

import dynamic from 'next/dynamic';
import Banner from '../../src/components/banner/banner';
import Header from '../../src/components/header/Header';
import Guide from '../../src/pageComponents/signature-mint/Guide';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const SignatureMint = dynamic(
  async () => import('../../src/pageComponents/signature-mint/ContractDemo').then((mod) => mod),
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
      <main className="container mx-auto flex flex-col px-8 py-6">
        <Banner pageName="Signature Mint" pageUrl="signature-mint" />
        <SignatureMint />
        <Guide />
      </main>
    </>
  );
}
