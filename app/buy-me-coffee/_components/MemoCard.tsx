import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { clsx } from 'clsx';
import { convertBigIntTimestampToDate } from '@/utils/timestamp';
import type { CoffeeMemo } from './types';

/**
 * Memo received from the coffee purchase in BuyMeACoffee smart contract.
 *
 * @param twitterHandle Twitter handle of the person who sent the memo.
 * @param message Message sent by the person.
 * @param timestamp Timestamp of the memo.
 */
function MemoCard({ numCoffees, twitterHandle, message, userAddress, time }: CoffeeMemo) {
  const convertedTimestamp = convertBigIntTimestampToDate(time);
  const numCoffeesInt = Number(numCoffees);

  return (
    <li className="flex w-full flex-col items-start gap-4">
      <div className="w-full grow items-center justify-between lg:flex">
        <div className="flex items-center gap-3">
          <Avatar address={userAddress} />
          <div className="inline-flex items-start gap-1 md:flex">
            <span className="text-3 text-bold truncate text-wrap font-bold text-boat-color-palette-foreground">
              <Name address={userAddress} />
            </span>
            <span className="text-3 line-clamp-1 flex-1 truncate text-wrap break-all font-normal text-boat-color-palette-foregroundmuted">
              {twitterHandle ? ` (@${twitterHandle})` : null}
            </span>
            <span className="text-3 whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
              bought {numCoffeesInt} coffee{numCoffeesInt > 1 ? 's' : null}
            </span>
          </div>
        </div>
        <div className="text-3 ml-[43px] whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
          {convertedTimestamp.toDateString()}
        </div>
      </div>
      <div
        className={clsx([
          'flex w-full items-center rounded-2xl border-2',
          'border-solid border-[color:var(--boat-color-foregroundMuted,#8A919E)] p-6 backdrop-blur-[20px]',
        ])}
      >
        <p className="flex w-[0px] shrink grow items-start gap-1">
          <span
            className={clsx([
              'truncate whitespace-nowrap text-wrap text-base ',
              'font-normal not-italic leading-6 text-boat-color-palette-foreground',
            ])}
          >
            {message}
          </span>
        </p>
      </div>
    </li>
  );
}

export default MemoCard;
