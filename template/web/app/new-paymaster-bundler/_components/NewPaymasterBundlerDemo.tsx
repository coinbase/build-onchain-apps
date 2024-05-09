import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
// import { POST } from './NewPaymasterProxy';
const deployUrl = process.env.BOAT_DEPLOY_URL ?? process.env.VERCEL_URL;
const defaultUrl = deployUrl
  ? `https://${deployUrl}`
  : `http://localhost:${process.env.PORT ?? 3000}`;

const abi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', type: 'address' }],
    name: 'safeMint',
    outputs: [],
  },
] as const;

export default function NewPaymasterBundlerDemo() {
  const account = useAccount();
  const { data: id, writeContracts } = useWriteContracts();

  const handleMint = async () => {
    console.log('account: ', account);
    if (account.address === undefined) { 
        alert("You need to be signed in to mint an NFT.");
        console.error('You need to be signed in to mint an NFT.');
        return;
    }


    try {
      writeContracts({
        contracts: [
          {
            address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
            abi,
            functionName: 'safeMint',
            args: [account.address],
          },
          {
            address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
            abi,
            functionName: 'safeMint',
            args: [account.address],
          },
        ],
        capabilities: {
          paymasterService: {
            url: defaultUrl, // The URL from your paymaster service provider, or your app's backend as described in step (2) above
          },
        },
      });
      
      console.log('Minting successful!');
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div>
      <h2>New Paymaster Bundler Demo</h2>
      <button
        type="button"
        className="block w-full rounded-full border  bg-white py-4 text-black hover:bg-gray-800 hover:text-white"
        onClick={handleMint}
      >
        Mint NFT
      </button>
      {id && <div> ID: {id}</div>}
    </div>
  );
}
