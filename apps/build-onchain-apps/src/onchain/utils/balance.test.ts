import { getAccountBalance } from './balance';

describe('getAccountBalance', () => {
  it('should return a string of class names', () => {
    const accountBalance = getAccountBalance({ formatted: '1234567890', symbol: 'test' });
    expect(accountBalance).toEqual('12345 test');
  });
});
