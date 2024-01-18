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
    <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-[16px] self-stretch">
      <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
        <div className="relative inline-flex flex-[0_0_auto] items-center gap-[16px]">
          <div className="relative h-[40px] w-[40px] rounded-[20px] bg-boat-color-yellow-60">
            <div className="absolute left-[15px] top-[9px] whitespace-nowrap text-center text-[16px] font-semibold leading-[normal] tracking-[0] text-white [font-family:'Inter-SemiBold',Helvetica]">
              {userName[0]}
            </div>
          </div>
          <div className="relative inline-flex flex-[0_0_auto] items-start gap-[4px]">
            <div className="relative inline-flex flex-[0_0_auto] items-center gap-[8px]">
              <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-[16px] font-bold leading-[24px] tracking-[0] text-boat-color-palette-foreground [font-family:'Inter-Bold',Helvetica]">
                {userName}
              </div>
            </div>
            <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-[16px] font-normal leading-[24px] tracking-[0] text-boat-color-palette-foregroundmuted [font-family:'Inter-Regular',Helvetica]">
              bought 1 coffee
            </div>
          </div>
        </div>
        <div className="relative w-fit whitespace-nowrap text-[16px] font-normal leading-[24px] tracking-[0] text-boat-color-palette-foregroundmuted [font-family:'Inter-Regular',Helvetica]">
          {convertedTimestamp.toDateString()}
        </div>
      </div>
      <div className="relative flex w-full flex-[0_0_auto] items-center gap-[273px] self-stretch rounded-[16px] border-2 border-solid border-transparent bg-[#161616e6] p-[24px] backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)] [border-image:linear-gradient(to_bottom,rgb(245,89,37),rgb(215,89,134))_1]">
        <div className="relative inline-flex flex-[0_0_auto] items-center gap-[16px]">
          <div className="relative inline-flex flex-[0_0_auto] items-start gap-[4px]">
            <p className="relative mt-[-1.00px] w-fit whitespace-nowrap text-[16px] font-normal leading-[24px] tracking-[0] text-boat-color-palette-foreground [font-family:'Inter-Regular',Helvetica]">
              {message} ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoCard;
