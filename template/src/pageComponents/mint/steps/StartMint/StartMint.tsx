import clsx from 'clsx';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import { useCustom1155Contract } from '../../../../hooks/contracts';
import { EXPECTED_CHAIN } from '../../ContractDemo';

export default function StartMint() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const contract = useCustom1155Contract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { config } = usePrepareContractWrite({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    enabled: onCorrectNetwork,
  });

  // A future enhancement would be to use the `isLoading` and `isSuccess`
  // properties returned by `useContractWrite` to indicate transaction
  // status in the UI.
  const { write: mint } = useContractWrite(config);

  return (
    <>
      <button
        type="button"
        onClick={mint}
        className={clsx(
          'my-8 block w-full rounded-full bg-white py-4 text-center text-sm text-black',
          onCorrectNetwork ? 'bg-white' : 'bg-gray-400',
        )}
        disabled={!onCorrectNetwork}
      >
        Mint
      </button>

      <div className="items-center md:flex">
        <div className="w-full flex-shrink-0 flex-grow md:max-w-[70%]">
          <ProgressBar percent={45} />
        </div>
        <div className="mt-2 w-full flex-shrink flex-grow-0 text-boat-footer-light-gray md:mt-0 md:text-right">
          94/200 Minted
        </div>
      </div>
    </>
  );
}
