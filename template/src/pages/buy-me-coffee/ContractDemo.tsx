import { useCallback } from 'react';
import useOnchainCoffeeMemos from '../../hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();

  const handleOncomplete = useCallback(() => {
    void refetchMemos();
  }, [refetchMemos]);

  return (
    <div className="mt-10 grid grid-cols-1 items-stretch justify-start md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg">
      <div className="rounded-[20px] border border-solid border-boat-color-palette-line bg-boat-color-palette-backgroundalternate p-[40px]">
        <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[16px]">
          <div className="relative inline-flex flex-[0_0_auto] items-center gap-[16px]">
            <div className="relative inline-flex flex-[0_0_auto] items-start gap-[8px]">
              <div className="relative mt-[-1.00px] w-fit text-[24px] font-semibold leading-[normal] tracking-[0] text-white [font-family:'Inter-SemiBold',Helvetica]">
                Messages from supporters
              </div>
            </div>
          </div>
        </div>
        {memos?.length > 0 && <Memos memos={memos} />}
      </div>
      <div className="rounded-[20px] border border-solid border-boat-color-palette-line bg-boat-color-palette-backgroundalternate p-[40px] pt-9">
        <FormBuyCoffee onComplete={handleOncomplete} />
      </div>
    </div>
  );
}
