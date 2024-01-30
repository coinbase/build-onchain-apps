import { SymbolIcon } from '@radix-ui/react-icons';

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

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-full bg-black py-4 text-sm"
      >
        <span className="mr-2">
          <SymbolIcon width={15} height={15} />
        </span>
        <span>Transaction pending</span>
      </button>
    </>
  );
}
