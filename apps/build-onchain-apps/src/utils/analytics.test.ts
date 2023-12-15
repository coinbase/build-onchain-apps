import { initAnalytics, markStep } from './analytics';

describe('analytics', () => {
  it('should initAnalytics be defined', () => {
    expect(initAnalytics).toBeDefined();
  });

  it('should markStep be defined', () => {
    expect(markStep).toBeDefined();
  });
});
