import dynamic from 'next/dynamic';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const SignatureMint = dynamic(
  async () => import('../../src/components/mint/SignatureMint').then((mod) => mod),
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
      <TitleAndMetaTags
        title="Build Onchain Apps - Signature Mint"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <Header />
      <main className="container mx-auto flex flex-col">
        <SignatureMint />
      </main>
    </>
  );
}
