import { useCallback } from 'react';
import { Theme, Box, Container, Flex, Grid, Section, Text } from '@radix-ui/themes';
import Header from '@/components/Header';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';

export default function Home() {

  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />

      <div>
        <Theme radius="medium" scaling="100%">
          <Header />
        </Theme>

        <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
          Ciao
        </Container>
      </div>
    </>
  );
}
