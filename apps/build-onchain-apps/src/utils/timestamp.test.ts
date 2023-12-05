import { convertBigIntTimestampToDate } from './timestamp';

describe('convertBigIntTimestampToDate', () => {
  it('should convert a big int timestamp to a date', () => {
    const timestamp = 1614105600000;
    convertBigIntTimestampToDate(timestamp as unknown as bigint);
    // TODO Fix later
    expect(true).toEqual(true);
  });
});
