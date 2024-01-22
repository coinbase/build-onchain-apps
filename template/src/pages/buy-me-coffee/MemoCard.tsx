import Avatar from '../../components/Avatar';
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
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex items-center justify-between self-stretch">
        <div className="flex items-center gap-3">
          <Avatar name={userName} />
          <div className="flex items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="text-3 text-bold w-fit whitespace-nowrap font-bold text-boat-color-palette-foreground">
                {userName}
              </div>
            </div>
            <div className="text-3 w-fit whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
              bought 1 coffee
            </div>
          </div>
        </div>
        <div className="text-3 w-fit whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
          {convertedTimestamp.toDateString()}
        </div>
      </div>
      <div className="flex w-full items-center rounded-2xl border-2 border-solid border-[color:var(--boat-color-foregroundMuted,#8A919E)] p-6 backdrop-blur-[20px]">
        <div className="flex w-[0px] shrink grow items-start gap-1">
          <p className="truncate whitespace-nowrap text-wrap text-base font-normal not-italic leading-6 text-boat-color-palette-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemoCard;
