import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useBuyMeACoffeeContract } from '../../../../hooks/contracts';
import { BUY_COFFEE_AMOUNT_RAW } from './consts';

type WarningContentContainerProps = {
  children: React.ReactNode;
};

function WarningContentWrapper({ children }: WarningContentContainerProps) {
  return (
    <div className="my-3 flex items-center justify-center">
      <div className="mr-2">
        <ExclamationTriangleIcon width={12} height={12} />
      </div>
      <div className="text-xs">{children}</div>
    </div>
  );
}

type WarningContentProps = {
  canAfford: boolean;
  contract: ReturnType<typeof useBuyMeACoffeeContract>;
};

export function WarningContent({ canAfford, contract }: WarningContentProps) {
  if (contract.status === 'ready' || canAfford) {
    return null;
  }

  if (contract.status === 'notConnected') {
    return <WarningContentWrapper>Please connect your wallet to continue.</WarningContentWrapper>;
  }

  if (contract.status === 'onUnsupportedNetwork') {
    return (
      <WarningContentWrapper>
        Please connect to one of the supported networks to continue:{' '}
        {contract.supportedChains.map((c) => c.name).join(', ')}
      </WarningContentWrapper>
    );
  }

  if (contract.status === 'deactivated') {
    return (
      <WarningContentWrapper>
        This contract has been deactivated on this chain.
      </WarningContentWrapper>
    );
  }

  return (
    <WarningContentWrapper>
      You must have at least {String(BUY_COFFEE_AMOUNT_RAW)} ETH in your wallet to continue.
    </WarningContentWrapper>
  );
}
