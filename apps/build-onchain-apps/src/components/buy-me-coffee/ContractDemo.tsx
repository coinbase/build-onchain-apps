import { useCallback } from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
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
