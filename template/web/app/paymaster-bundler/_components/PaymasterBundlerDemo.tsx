import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import { CallStatus } from './CallStatus';
import { Capabilities } from './Capabilities';
import { myNFTABI } from '../ABIs/myNFT';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '::1',
);

// Use the local API URL to target the Paymaster directly without a proxy if running on localhost,
// otherwise use the Paymaster Proxy.
const defaultUrl = isLocalhost
  ? `https://api.developer.coinbase.com/rpc/v1/base-sepolia/z7inYI-NRNAOF9kgaW4Suf-30N6DuMra`
  : `${document.location.origin}/paymaster-bundler/api/`;

console.log('Default url: ', defaultUrl);

export default function PaymasterBundlerDemo() {
  const account = useAccount();
  const { data: id, writeContracts } = useWriteContracts();

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
            address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
            abi: myNFTABI,
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

  return (
    <div className="p-5 font-sans">
      <div className="mb-5">
        <h2 className="border-b-2 border-gray-300">Account Details</h2>
        <div className="mt-2 text-lg">
          <strong>Status:</strong> {account.status}
          <br />
          <strong>Chain ID:</strong> {account.chainId}
          <br />
          <strong>Addresses:</strong> {JSON.stringify(account.addresses)}
          <br />
          <Capabilities />
          <br />
        </div>
      </div>
      <div>
        <h2 className="border-b-2 border-gray-300">
          Mint an NFT using Smart Wallets. Sponsored by Coinbase!
        </h2>
        <button
          type="button"
          className="mt-2 block w-full cursor-pointer rounded-full border-2 border-black bg-white py-3.5 text-lg font-bold text-black hover:bg-gray-800 hover:text-white"
          onClick={handleMint}
        >
          Mint NFT
        </button>
        <br />
        {id && <CallStatus id={id} />}
        {id && (
          <div className="mt-2 text-lg">
            <strong>Transaction ID:</strong> {id}
          </div>
        )}
      </div>
    </div>
  );
}
