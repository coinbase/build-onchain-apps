import { Quote, Avatar } from '@radix-ui/themes';
import { convertBigIntTimestampToDate } from '../../utils/timestamp';
import type { CoffeeMemo } from '../../types';

/**
 * Memo received from the coffee purchase in BuyMeACoffee smart contract.
 * https://github.com/alchemyplatform/RTW3-Week2-BuyMeACoffee-Contracts/blob/main/contracts/BuyMeACoffee.sol#L16
 * @param userName Name of the person who sent the memo.
 * @param message Message sent by the person.
 * @param timestamp Timestamp of the memo.
 */
function MemoCard({ userName, message, time }: CoffeeMemo) {
  const convertedTimestamp = convertBigIntTimestampToDate(time);
  return (
    <div className="rounded-xl border border-solid border-zinc-700 bg-zinc-900 p-3">
      <div className="flex justify-start gap-3">
        <div className="flex items-center justify-between gap-3">
          <Avatar size="3" radius="full" fallback="T" color="orange" />
        </div>
        <div className="grow-1 flex flex-col justify-start gap-2">
          <div className="flex items-center justify-between">
            <span className="mr-2 text-sm font-bold">{userName}</span>
            <span className="text-sm font-normal text-gray-400">
              {convertedTimestamp.toDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            <Quote>{message}</Quote>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemoCard;
