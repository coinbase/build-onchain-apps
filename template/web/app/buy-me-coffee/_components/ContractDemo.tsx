import { clsx } from 'clsx';
import Button from '@/components/Button/Button';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function BuyMeCoffeeContractDemo() {
  const pageSize = 5;
  const { memos, refetchMemos, currentPage, goToPreviousPage, goToNextPage } =
    useOnchainCoffeeMemos(pageSize);

  return (
    <div
      className={clsx([
        'grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
      <section
        className={clsx([
          'rounded-lg border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10',
        ])}
      >
        <h2 className="mb-5 w-fit text-2xl font-semibold text-white">Messages from supporters</h2>

        {memos?.length > 0 && <Memos memos={memos} />}
        <div className="mt-4 flex flex items-center justify-between">
          <Button
            className="w-auto px-10"
            onClick={goToPreviousPage}
            disabled={currentPage < 1}
            buttonContent={<span>Read older messages</span>}
          />

          <div>Page {currentPage + 1}</div>

          <Button
            className="w-auto px-10"
            onClick={goToNextPage}
            disabled={memos.length < pageSize}
            buttonContent={<span>Read newer messages</span>}
          />
        </div>
      </section>
      <aside>
        <div
          className={clsx([
            'mt-10 rounded-lg border border-solid border-boat-color-palette-line',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          <FormBuyCoffee refetchMemos={refetchMemos} />
        </div>
      </aside>
    </div>
  );
}
