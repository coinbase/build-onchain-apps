import { Container, Section } from '@radix-ui/themes';
import BuyMeCoffee from '../../src/components/buy-me-coffee/BuyMeCoffee';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';

export default function BuyMeCoffeePage() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />
      <Header />
      <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
        <Section size={{ initial: '2', md: '3' }}>
          <BuyMeCoffee />
        </Section>
      </Container>
    </>
  );
}
