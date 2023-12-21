import { Container, Section } from '@radix-ui/themes';
import Header from '../../src/components/header/Header';
import Home from '../../src/components/home/Home';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';

export default function HomePage() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <Header />
      <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
        <Section>
          <Home />
        </Section>
      </Container>
    </>
  );
}
