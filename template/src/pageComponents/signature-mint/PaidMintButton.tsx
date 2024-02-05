import { parseEther } from 'viem';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useSignatureMint721 } from '../../hooks/contracts';

type PaidMintButtonProps = {
  signatureMint721Contract: ReturnType<typeof useSignatureMint721>;
  address: `0x${string}` | undefined;
};

export default function PaidMintButton({ signatureMint721Contract, address }: PaidMintButtonProps) {
  /**
   * Paid Mint Contract Write Logic
   */
  const { config: paidMintConfig } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address:
      signatureMint721Contract.status === 'ready' ? signatureMint721Contract.address : undefined,
    abi: signatureMint721Contract.abi,
    functionName: 'mint',
    args: [address],
    value: parseEther('0.0001'), // You should read the contract, however, setting this to value to prevent abuse.
  });
  const { write: paidMint } = useContractWrite(paidMintConfig);

  return (
    <button
      type="button"
      onClick={paidMint}
      className="focus:shadow-outline ml-3 rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
    >
      Paid Mint
    </button>
  );
}
