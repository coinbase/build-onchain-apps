import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { abi } from './PaymasterBundlerABI';

export const usePaymasterBundlerContract = generateContractHook({
  abi: abi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
  },
});
