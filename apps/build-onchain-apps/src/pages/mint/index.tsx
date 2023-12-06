import { Theme, Container, Section } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const Mint = dynamic(async () => import('./components/Mint').then((mod) => mod.Mint), {
  ssr: false,
});

export default function MintPage() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps - Mint"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />

      <div>
        <Theme radius="medium" scaling="100%">
          <Header />
        </Theme>

        <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
          <Section size={{ initial: '2', md: '3' }}>
            <Mint />
          </Section>
        </Container>
      </div>
    </>
  );
}
