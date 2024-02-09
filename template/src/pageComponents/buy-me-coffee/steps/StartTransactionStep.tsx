import { SymbolIcon } from '@radix-ui/react-icons';
import Button from '../../../components/Button/Button';

export default function StartTransactionStep() {
  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">
        Coffee brewing...
      </h2>

      <div className="text-center text-6xl">☕</div>

      <div className="my-4 text-center text-sm text-gray-400">
        Please confirm transaction in your wallet
      </div>

      <Button
        buttonContent={<span>Transaction pending</span>}
        icon={<SymbolIcon width={15} height={15} />}
        variant="secondary"
      />
    </>
  );
}
