import { useCallback } from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from '../../components/buy-me-coffee/FormBuyCoffee';
import Memos from '../../components/buy-me-coffee/Memos';

export default function BuyMeCoffee() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
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
  );
}
