import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useAccount, useConfig, useSimulateContract, useWriteContract } from 'wagmi';
import Button from '../../../components/Button/Button';
import { EXPECTED_CHAIN } from '../../../constants';
import { useCustom1155Contract } from '../../../hooks/contracts';
import { MintSteps } from '../ContractDemo';

type StartMintProps = {
  setMintStep: React.Dispatch<React.SetStateAction<MintSteps | null>>;
};

export default function StartMintStep({ setMintStep }: StartMintProps) {
  const { chains } = useConfig();
  const { address } = useAccount();

  const contract = useCustom1155Contract();

  const onCorrectNetwork = chains[0]?.id === EXPECTED_CHAIN.id;

  const { data } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
  });

  const { isSuccess, isError, writeContract } = useWriteContract();

  useEffect(() => {
    if (isError) {
      setMintStep(null);
    }
  }, [isError, setMintStep]);

  useEffect(() => {
    if (isSuccess) {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
    }
  }, [isSuccess, setMintStep]);

  const handleMint = useCallback(() => {
    if (!data?.request) {
      setMintStep(null);
      return;
    }
    writeContract(data.request);
    setMintStep(MintSteps.MINT_PROCESSING_STEP);
  }, [data?.request, setMintStep, writeContract]);

  return (
    <Button
      buttonContent="Mint"
      onClick={handleMint}
      disabled={!onCorrectNetwork}
      className={clsx('my-4', onCorrectNetwork ? 'bg-white' : 'bg-gray-400')}
    />
  );
}
