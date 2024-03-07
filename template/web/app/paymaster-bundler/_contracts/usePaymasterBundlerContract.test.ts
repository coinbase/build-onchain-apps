import { baseSepolia } from 'viem/chains';
import { entryPoint } from '../constants';
import PaymasterBundlerABI from './PaymasterBundlerABI';
import { usePaymasterBundlerContract } from './usePaymasterBundlerContract';

describe('usePaymasterBundlerContract', () => {
  it('should return correct contract data', () => {
    const contract = usePaymasterBundlerContract();

    expect(contract).toEqual({
      abi: PaymasterBundlerABI,
      address: entryPoint,
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});
