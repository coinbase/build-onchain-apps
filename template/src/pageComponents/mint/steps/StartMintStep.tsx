import { useCallback } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import Button from '../../../components/Button/Button';
import { EXPECTED_CHAIN } from '../../../constants';
import { useCustom1155Contract } from '../../../hooks/contracts';
import { MintSteps } from '../ContractDemo';

type StartMintProps = {
  setMintStep: React.Dispatch<React.SetStateAction<MintSteps | null>>;
};

export default function StartMintStep({ setMintStep }: StartMintProps) {
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
  const { write: performMint } = useContractWrite({
    ...config,
    onSuccess() {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
    },
    onError(e) {
      if (
        e instanceof TransactionExecutionError &&
        e.message.toLowerCase().includes('out of gas')
      ) {
        setMintStep(MintSteps.OUT_OF_GAS_STEP);
      } else {
        setMintStep(null);
      }
    },
  });

  const handleMint = useCallback(() => {
    performMint?.();
    setMintStep(MintSteps.MINT_PROCESSING_STEP);
  }, [performMint, setMintStep]);

  return (
    <Button
      buttonContent="Mint"
      onClick={handleMint}
      disabled={!onCorrectNetwork}
      className={clsx('my-4', onCorrectNetwork ? 'bg-white' : 'bg-gray-400')}
    />
  );
}
