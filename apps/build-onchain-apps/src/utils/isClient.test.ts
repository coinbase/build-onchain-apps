import isClient from './isClient';

describe('isClient', () => {
  it('should return true if window is defined', () => {
    expect(isClient()).toBe(true);
  });
});
