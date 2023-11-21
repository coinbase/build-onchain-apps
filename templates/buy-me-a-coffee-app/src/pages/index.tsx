import { useCallback } from 'react';
import { Theme, Box, Container, Flex, Grid, Section, Text } from '@radix-ui/themes';
import Head from 'next/head';
import { ThemesHeader } from '@/components/ThemesHeader';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';
import { FormBuyCoffee, Memos } from '@/features/BuyMeACoffee';
import { useOnchainCoffeeMemos } from '@/onchain/hooks/useOnchainCoffeeMemos';

export default function Home() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <TitleAndMetaTags
        title="Buy Me A Coffee – Build Onchain Apps"
        description="Templates for building onchain apps."
        image="themes.png"
      />

      <div>
        <Theme radius="medium" scaling="100%">
          <ThemesHeader />
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
