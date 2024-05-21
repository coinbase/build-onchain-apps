import { baseSepolia } from 'viem/chains';
import { SMART_WALLET_ENTRY_POINT_ADDRESS } from '../constants';
import { usePaymasterBundlerContract } from './PaymasterBundlerContract';
import { abi } from './PaymasterBundlerABI';

describe('usePaymasterBundlerContract', () => {
  it('should return correct contract data', () => {
    const contract = usePaymasterBundlerContract();

    expect(contract).toEqual({
      abi: abi,
      address: SMART_WALLET_ENTRY_POINT_ADDRESS,
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});
