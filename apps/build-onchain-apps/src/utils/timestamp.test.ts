import { convertBigIntTimestampToDate } from './timestamp';

describe('convertBigIntTimestampToDate', () => {
  it('should convert a big int timestamp to a date', () => {
    const timestamp = 1614105600000;
    convertBigIntTimestampToDate(timestamp as unknown as bigint);
    expect(convertBigIntTimestampToDate(timestamp as unknown as bigint)).toEqual(
      '2021-02-23T00:00:00.000Z',
    );
  });
});
