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
    <div className="flex gap-3">
      <div className="flex items-center justify-center gap-3">
        B
      </div>
      <div className="flex grow flex-col gap-2">
        <div className="flex items-center justify-between">
          <p>{userName}</p>
          <p>{convertedTimestamp.toDateString()}</p>
        </div>
        <p>
          {message}
        </p>
      </div>
    </div>
  );
}

export default MemoCard;
