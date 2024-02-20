import { baseSepolia } from 'viem/chains';
import Custom1155ABI from './Custom1155ABI';
import { useCustom1155Contract } from './useCustom1155Contract';

describe('useCustom1155Contract', () => {
  it('should return correct contract data', () => {
    const contract = useCustom1155Contract();
    expect(contract).toEqual({
      abi: Custom1155ABI,
      address: '0x6268A5F72528E5297e5A63B35e523E5C131cC88C',
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});
