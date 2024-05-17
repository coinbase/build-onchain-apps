import { baseSepolia } from 'viem/chains';
import { SMART_WALLET_ENTRY_POINT_ADDRESS } from '../constants';
import { abi } from './NewPaymasterBundlerABI';
import { useNewPaymasterBundlerContract } from './useNewPaymasterBundlerContract';

describe('usePaymasterBundlerContract', () => {
  it('should return correct contract data', () => {
    const contract = useNewPaymasterBundlerContract();

    expect(contract).toEqual({
      abi: abi,
      address: SMART_WALLET_ENTRY_POINT_ADDRESS,
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});
