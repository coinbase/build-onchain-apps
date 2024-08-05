import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import { ContractAlertLayout } from 'app/buy-me-coffee/_components/ContractAlert';
import isLocal from '../../../src/utils/isLocal';
import { usePaymasterBundlerContract } from '../_contracts/usePaymasterBundlerContract';
import { CallStatus } from './CallStatus';

// Target the Paymaster directly without a proxy if running on localhost.
// Use the Paymaster Proxy when deployed.
const isLocalEnv = isLocal();
const defaultUrl = isLocalEnv
  ? process.env.NEXT_PUBLIC_PAYMASTER_URL
  : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/paymaster-proxy`;

export default function PaymasterBundlerDemo() {
  const { address } = useAccount();
  const { data: callID, writeContracts } = useWriteContracts();
  const contract = usePaymasterBundlerContract();

  if (contract.status !== 'ready') {
    console.error('Contract is not ready');
    return null;
  }

  const handleMint = () => {
    writeContracts({
      contracts: [
        {
          address: contract.address,
          abi: contract.abi,
          functionName: 'safeMint',
          args: [address],
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
    <div className={clsx('flex w-full flex-col items-center justify-center text-white')}>
      <section className={clsx('mb-5 w-full max-w-3xl rounded-lg bg-gray-900 p-6 shadow-md')}>
        <header>
          <h2 className={clsx('border-b-2 border-gray-700 pb-2 text-xl font-semibold')}>
            Account Details
          </h2>
        </header>
        {address && (
          <div className={clsx('mt-2 text-lg')}>
            <strong>Smart Wallet Address:</strong> {address}
          </div>
        )}
      </section>
      <section className={clsx('w-full max-w-3xl rounded-lg bg-gray-900 p-6 shadow-md')}>
        <header>
          <h1 className={clsx('border-b-2 border-gray-700 pb-2 text-center text-2xl font-bold')}>
            Mint NFTs with Coinbase Paymaster
          </h1>
        </header>
        {!address && (
          <ContractAlertLayout>Please connect your wallet to continue.</ContractAlertLayout>
        )}
        <button
          type="button"
          className={clsx(
            'mt-4 block w-full rounded-full py-3.5 text-lg font-bold text-white transition duration-300',
            address
              ? 'cursor-pointer bg-blue-600 hover:bg-blue-700'
              : 'cursor-not-allowed bg-gray-600',
          )}
          onClick={address ? handleMint : undefined}
          disabled={!address}
        >
          Mint NFT
        </button>
        {callID && <CallStatus id={callID} />}
      </section>
    </div>
  );
}
