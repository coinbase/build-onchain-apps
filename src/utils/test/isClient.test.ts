import isClient from '../isClient';

describe('isClient', () => {
  it('should return true if window is undefined', () => {
    expect(isClient()).toBe(false);
  });
});
