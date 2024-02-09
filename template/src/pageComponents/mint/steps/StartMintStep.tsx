import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import { useAccount, useSimulateContract, useWriteContract } from 'wagmi';
import Button from '../../../components/Button/Button';
import { EXPECTED_CHAIN } from '../../../constants';
import { useCustom1155Contract } from '../../../hooks/contracts';
import { MintSteps } from '../ContractDemo';

type StartMintProps = {
  setMintStep: React.Dispatch<React.SetStateAction<MintSteps | null>>;
};

export default function StartMintStep({ setMintStep }: StartMintProps) {
  const { address, chain } = useAccount();

  const contract = useCustom1155Contract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { data } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    query: {
      enabled: onCorrectNetwork,
    },
  });

  // A future enhancement would be to use the `isLoading` and `isSuccess`
  // properties returned by `useContractWrite` to indicate transaction
  // status in the UI.
  const { writeContract: performMint, status: statusMint, error: errorMint } = useWriteContract();

  const handleMint = useCallback(() => {
    if (data?.request) {
      performMint?.(data?.request);
    } else {
      setMintStep(null);
    }
  }, [data?.request, performMint, setMintStep]);

  useEffect(() => {
    if (statusMint === 'success') {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
    } else if (statusMint === 'error') {
      if (
        errorMint instanceof TransactionExecutionError &&
        errorMint.message.toLowerCase().includes('out of gas')
      ) {
        setMintStep(MintSteps.OUT_OF_GAS_STEP);
      } else {
        setMintStep(null);
      }
    } else {
    }
  }, [errorMint, setMintStep, statusMint]);

  return (
    <Button
      buttonContent="Mint"
      onClick={handleMint}
      disabled={!onCorrectNetwork}
      className={clsx('my-4', onCorrectNetwork ? 'bg-white' : 'bg-gray-400')}
    />
  );
}
