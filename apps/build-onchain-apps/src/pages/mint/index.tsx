import { Theme, Box, Container, Flex, Grid, Section, Text } from '@radix-ui/themes';
import Header from '@/components/Header';
import { DefaultNavbar } from '@/components/Navbar';
import { TitleAndMetaTags } from '@/components/TitleAndMetaTags';

export default function Mint() {
  return (
    <>
      <TitleAndMetaTags
        title="Build Onchain Apps - Mint"
        description="Build Onchain Applications with the best consumer experience in a few minutes."
        image="themes.png"
      />

      <div>
        <Theme radius="medium" scaling="100%">
          <Header>
            <DefaultNavbar />
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
              </Box>
              <Box position="relative" pt="9">
                
              </Box>
            </Grid>
          </Section>
        </Container>
      </div>
    </>
  );
}
