import { baseSepolia } from 'viem/chains';
import { useBuyMeACoffeeContract } from './useBuyMeACoffeeContract';
import BuyMeACoffeeABI from './BuyMeACoffeeABI';

describe('useBuyMeACoffeeContract', () => {
  it('should return correct contract data', () => {
    const contract = useBuyMeACoffeeContract();
    expect(contract).toEqual({
      abi: BuyMeACoffeeABI,
      address: '0xcE0EBD0282e247553eb8fDdeE3281b5EC09ddD16',
      status: 'ready',
      supportedChains: [baseSepolia],
    });
  });
});
