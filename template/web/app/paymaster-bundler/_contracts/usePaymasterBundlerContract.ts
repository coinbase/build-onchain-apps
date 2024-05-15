import { myNFTABI } from '../_contracts/myNFTABI';
import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';

export const usePaymasterBundlerContract = generateContractHook({
    abi: myNFTABI,
    [baseSepolia.id]: {
        chain: baseSepolia,
        address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
      },
})