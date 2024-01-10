import { useCallback } from 'react';
import { baseSepolia } from 'viem/chains';
import { useSwitchNetwork } from 'wagmi';

// TODO: use supported contracts from hook to populate selector
const EXPECTED_CHAIN = baseSepolia;

function SwitchNetwork() {
  const { switchNetwork } = useSwitchNetwork({ chainId: EXPECTED_CHAIN.id });
  const handleClick = useCallback(() => (switchNetwork ? switchNetwork() : null), [switchNetwork]);
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
