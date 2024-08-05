import { getAccountBalance } from '../balance';

describe('getAccountBalance', () => {
  it('should return a string of class names', () => {
    const wagmiFetchBalanceResult = {
      decimals: 18,
      formatted: '0.097970395124611628',
      symbol: 'ETH',
      value: 97970395124611628n,
    };
    const accountBalance = getAccountBalance(wagmiFetchBalanceResult);
    expect(accountBalance).toEqual('0.097 ETH');
  });
});
