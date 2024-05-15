import clsx from 'clsx';
import { useAccount, useReadContract } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import { Capabilities } from '../../../src/components/SmartWallets/Capabilities';
import isLocal from '../../../src/utils/isLocal';
import { myNFTABI } from '../_contracts/myNFTABI';
import { usePaymasterBundlerContract } from '../_contracts/usePaymasterBundlerContract';
import { CallStatus } from './CallStatus';


// Use the local API URL to target the Paymaster directly without a proxy
// if running on localhost, otherwise use the Paymaster Proxy.
const isLocalEnv = isLocal();
const defaultUrl = isLocalEnv
  ? `https://api.developer.coinbase.com/rpc/v1/base-sepolia/z7inYI-NRNAOF9kgaW4Suf-30N6DuMra`
  : `${document.location.origin}/paymaster-bundler/api/`;

console.log('Default url: ', defaultUrl);

export default function PaymasterBundlerDemo() {
  const account = useAccount();
  const { data: id, writeContracts } = useWriteContracts();

  const contract = usePaymasterBundlerContract();

  if (contract.status !== 'ready') {
    console.error('Contract is not ready');
    return;
  }

  const handleMint = async () => {
    console.log('Default url: ', defaultUrl);
    console.log('account: ', account);
    if (account.address === undefined) {
      alert('You need to be signed in to mint an NFT.');
      console.error('You need to be signed in to mint an NFT.');
      return;
    }

    try {
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

      console.log('Success writing contract!');
    } catch (error) {
      console.error('Error writing contract: ', error);
    }
  };

  const handleMintClick = () => {
    handleMint().catch((error) => {
      console.error('Error in handleMint:', error);
    });
  };

  return (
    <div className={clsx('p-5', 'font-sans')}>
      <section className={clsx('mb-5')}>
        <header>
          <h2 className={clsx('border-b-2', 'border-gray-300')}>Account Details</h2>
        </header>
        <div className={clsx('mt-2', 'text-lg')}>
          <strong>Smart Wallet Address:</strong> {JSON.stringify(account.address)}
        </div>
      </section>
      <section>
        <header>
          <h1 className={clsx('border-b-2', 'border-gray-300')}>
            Mint an NFT using Smart Wallets. Sponsored by Coinbase!
          </h1>
        </header>
        <button
          type="button"
          className={clsx(
            'mt-2',
            'block',
            'w-full',
            'cursor-pointer',
            'rounded-full',
            'bg-white',
            'py-3.5',
            'text-lg',
            'font-bold',
            'text-black',
          )}
          onClick={handleMintClick}
        >
          Mint NFT
        </button>
        <br />
        {id && <CallStatus id={id} />}
        {id && (
          <div className={clsx('mt-2', 'text-lg')}>
            <strong>Transaction ID:</strong> {id}
          </div>
        )}
      </section>
    </div>
  );
}
