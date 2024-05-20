import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import isLocal from '../../../src/utils/isLocal';
import { usePaymasterBundlerContract } from '../_contracts/usePaymasterBundlerContract';
import { CallStatus } from './CallStatus';

// Use the local API URL to target the Paymaster directly without a proxy
// if running on localhost, otherwise use the Paymaster Proxy.
const paymasterURL = process.env.PAYMASTER_URL;
const isLocalEnv = isLocal();
const defaultUrl = isLocalEnv ? paymasterURL : `${document.location.origin}/api/paymaster-proxy`;

export default function PaymasterBundlerDemo() {
  const account = useAccount();
  const { data: id, writeContracts } = useWriteContracts();

  const contract = usePaymasterBundlerContract();

  if (contract.status !== 'ready') {
    console.error('Contract is not ready');
    return null;
  }

  const handleMint = () => {
    if (!account.address) {
      alert('You need to be signed in to mint an NFT.');
      console.error('You need to be signed in to mint an NFT.');
      return;
    }

    writeContracts({
      contracts: [
        {
          address: contract.address,
          abi: contract.abi,
          functionName: 'safeMint',
          args: [account.address],
        },
      ],
      capabilities: {
        paymasterService: {
          url: defaultUrl,
        },
      },
    });
  };

  return (
    <div
      className={clsx('w-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-white')}
    >
      <section
        className={clsx(
          'bg-gray-900',
          'shadow-md',
          'rounded-lg',
          'p-6',
          'w-full',
          'max-w-3xl',
          'mb-5',
        )}
      >
        <header>
          <h2 className={clsx('border-b-2', 'border-gray-700', 'pb-2', 'text-xl', 'font-semibold')}>
            Account Details
          </h2>
        </header>
        {account.address && (
          <div className={clsx('mt-2', 'text-lg')}>
            <strong>Smart Wallet Address:</strong> {account.address}
          </div>
        )}
      </section>
      <section
        className={clsx('bg-gray-900', 'shadow-md', 'rounded-lg', 'p-6', 'w-full', 'max-w-3xl')}
      >
        <header>
          <h1
            className={clsx(
              'border-b-2',
              'border-gray-700',
              'pb-2',
              'text-2xl',
              'font-bold',
              'text-center',
            )}
          >
            Mint NFTs with Coinbase Paymaster
          </h1>
        </header>
        <button
          type="button"
          className={clsx(
            'mt-4',
            'block',
            'w-full',
            'cursor-pointer',
            'rounded-full',
            'bg-blue-600',
            'py-3.5',
            'text-lg',
            'font-bold',
            'text-white',
            'hover:bg-blue-700',
            'transition',
            'duration-300',
          )}
          onClick={handleMint}
        >
          Mint NFT
        </button>
        {id && <CallStatus id={id} />}
        {id && (
          <div
            className={clsx(
              'mt-4',
              'text-lg',
              'overflow-x-auto',
              'bg-gray-800',
              'p-4',
              'rounded-lg',
            )}
          >
            <strong>Transaction ID:</strong> <span className="break-all">{id}</span>
          </div>
        )}
      </section>
    </div>
  );
}
