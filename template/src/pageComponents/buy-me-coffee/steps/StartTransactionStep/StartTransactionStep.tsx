import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

      <button type="submit" className="block w-full rounded-full bg-black py-4 text-center text-sm">
        <span className="mr-2">
          <FontAwesomeIcon icon={faCircleNotch} spin />
        </span>
        <span>Transaction pending</span>
      </button>
    </>
  );
}
