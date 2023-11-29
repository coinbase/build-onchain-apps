import { useCallback } from 'react';
import { Theme, Box, Container, Flex, Grid, Section, Text } from '@radix-ui/themes';
import Header from '@/components/Header';
import { Navbar, NavbarLink } from '@/components/Navbar';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';
import { useOnchainCoffeeMemos } from '@/onchain/hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './components/FormBuyCoffee';
import Memos from './components/Memos';

export default function Home() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />

      <div>
        <Theme radius="medium" scaling="100%">
          <Header>
            <Navbar>
              <NavbarLink href="/">
                Home
              </NavbarLink>
              <NavbarLink href="/home">
                Buy My Coffee
              </NavbarLink>
            </Navbar>
          </Header>
        </Theme>

        <Container mx={{ initial: '5', xs: '6', sm: '7', md: '9' }}>
          <Section size={{ initial: '2', md: '3' }}>
            <Grid columns={{ md: '1fr 330px', lg: '1fr 380px' }} gap={{ md: '9' }}>
              <Box>
                <Flex mb="5">
                  <Text size="8" weight="bold" mb="1">
                    Messages
                  </Text>
                </Flex>
                {memos?.length > 0 && <Memos memos={memos} />}
              </Box>
              <Box position="relative" pt="9">
                <FormBuyCoffee onComplete={handleOncomplete} />
              </Box>
            </Grid>
          </Section>
        </Container>
      </div>
    </>
  );
}
