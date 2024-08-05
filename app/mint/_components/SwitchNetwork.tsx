import { useCallback } from 'react';
import { useSwitchChain } from 'wagmi';
// TODO: use supported contracts from hook to populate selector
import { EXPECTED_CHAIN } from '@/constants';

function SwitchNetwork() {
  const { switchChain } = useSwitchChain();
  const handleClick = useCallback(
    () => switchChain?.({ chainId: EXPECTED_CHAIN.id }),
    [switchChain],
  );

  return (
    <div className="flex flex-col justify-start">
      <p className="text-sm">Please switch to {EXPECTED_CHAIN.name}</p>
      <button type="button" onClick={handleClick}>
        Switch Network
      </button>
    </div>
  );
}

export default SwitchNetwork;
