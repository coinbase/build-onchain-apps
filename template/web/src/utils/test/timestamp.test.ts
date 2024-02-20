import { convertBigIntTimestampToDate } from '../timestamp';

describe('convertBigIntTimestampToDate', () => {
  it('should convert a big int timestamp to a date', () => {
    const timestamp = 1701704606n;
    const bigIntDate = convertBigIntTimestampToDate(timestamp);
    expect(bigIntDate.toISOString()).toEqual('2023-12-04T15:43:26.000Z');
  });
});
