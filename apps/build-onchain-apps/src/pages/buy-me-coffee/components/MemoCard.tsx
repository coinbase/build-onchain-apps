import { Card, Text, Flex, Quote, Avatar } from '@radix-ui/themes';
import { convertBigIntTimestampToDate } from '@utils/timestamp';
import type { CoffeeMemo } from '@/types';

/**
 * Memo received from the coffee purchase in BuyMeACoffee smart contract.
 * https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts/blob/main/contracts/BuyMeACoffee.sol#L16
 * @param name Name of the person who sent the memo.
 * @param message Message sent by the person.
 * @param timestamp Timestamp of the memo.
 */
function MemoCard({ name, message, timestamp }: CoffeeMemo) {
  const convertedTimestamp = convertBigIntTimestampToDate(timestamp);
  return (
    <Card variant="surface">
      <Flex gap="3">
        <Flex align="center" justify="between" gap="3">
          <Avatar size="3" radius="full" fallback="T" color="orange" />
        </Flex>
        <Flex direction="column" gap="2" grow="1">
          <Flex align="center" justify="between">
            <Text as="div" size="2" weight="bold">
              {name}
            </Text>
            <Text as="div" size="2" color="gray">
              {convertedTimestamp.toDateString()}
            </Text>
          </Flex>
          <Text as="div" color="gray" size="2">
            <Quote>{message}</Quote>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default MemoCard;
