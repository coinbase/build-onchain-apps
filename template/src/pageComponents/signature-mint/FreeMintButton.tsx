import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useSignatureMint721 } from '../../hooks/contracts';

type FreeMintButtonProps = {
  signatureMint721Contract: ReturnType<typeof useSignatureMint721>;
  address: `0x${string}` | undefined;
  signature: string;
};

export default function FreeMintButton({
  signatureMint721Contract,
  address,
  signature,
}: FreeMintButtonProps) {
  /**
   * Free Mint Contract Logic
   */
  const { config: freeMintConfig } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address:
      signatureMint721Contract.status === 'ready' ? signatureMint721Contract.address : undefined,
    abi: signatureMint721Contract.abi,
    functionName: 'freeMint',
    args: address ? [address, signature] : undefined,
    enabled: signature.length > 0,
  });
  const { write: freeMint } = useContractWrite(freeMintConfig);

  return (
    <button
      type="button"
      onClick={freeMint}
      className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none"
    >
      Mint NFT Free
    </button>
  );
}
