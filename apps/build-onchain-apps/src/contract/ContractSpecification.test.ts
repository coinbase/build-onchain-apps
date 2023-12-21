import { baseGoerli } from 'viem/chains';
import { contract } from './ContractSpecification';
import BuyMeACoffeeABI from './BuyMeACoffee';
import Custom1155ABI from './Custom1155';

describe('ContractSpecification', () => {
  it('should have the correct contract specifications for the buyMeACoffee contract', () => {
    expect(contract.buyMeACoffee).toEqual({
      abi: BuyMeACoffeeABI,
      [baseGoerli.id]: {
        chain: baseGoerli,
        address: '0x1784AAD01B4d05A8bC721DC8903dCbC9E0b20175',
      },
    });
  });

  it('should have the correct contract specifications for the custom1155 contract', () => {
    expect(contract.custom1155).toEqual({
      abi: Custom1155ABI,
      [baseGoerli.id]: {
        chain: baseGoerli,
        address: '0xBB955f815131818D62A220F70F5938daF812522d',
      },
    });
  });
});
