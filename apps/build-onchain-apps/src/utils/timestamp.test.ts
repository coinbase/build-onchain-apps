import { convertBigIntTimestampToDate } from './timestamp';

describe('convertBigIntTimestampToDate', () => {
    it('should convert a big int timestamp to a date', () => {
        const timestamp = 1614105600000;
        const date = convertBigIntTimestampToDate(timestamp);
        expect(date).toEqual(new Date(timestamp));
    });
});
