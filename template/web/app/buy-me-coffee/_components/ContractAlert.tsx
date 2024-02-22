import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Abi, parseEther } from 'viem';

import { useAccount } from 'wagmi';
import { UseContractReturn } from '@/hooks/contracts';
import { useLoggedInUserCanAfford } from '@/hooks/useUserCanAfford';

function useCanUserAfford(amount: number) {
  return useLoggedInUserCanAfford(parseEther(String(amount)));
}

function ContractAlertLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 flex items-center justify-center">
      <div className="mr-2">
        <ExclamationTriangleIcon width={12} height={12} />
      </div>
      <div className="text-xs">{children}</div>
    </div>
  );
}

type ContractAlertProps = {
  contract: UseContractReturn<Abi>;
  amount: number;
};

export default function ContractAlert({ contract, amount }: ContractAlertProps) {
  const { isConnected } = useAccount();
  const canAfford = useCanUserAfford(amount);

  if (!isConnected) {
    return <ContractAlertLayout>Please connect your wallet to continue.</ContractAlertLayout>;
  }

  if (contract.status === 'onUnsupportedNetwork') {
    return (
      <ContractAlertLayout>
        Please connect to one of the supported networks to continue:{' '}
        {contract.supportedChains.map((c) => c.name).join(', ')}
      </ContractAlertLayout>
    );
  }

  if (contract.status === 'deactivated') {
    return (
      <ContractAlertLayout>This contract has been deactivated on this chain.</ContractAlertLayout>
    );
  }

  if (!canAfford) {
    return (
      <ContractAlertLayout>
        You must have at least {String(amount)} ETH in your wallet to continue.
      </ContractAlertLayout>
    );
  }

  return null;
}
