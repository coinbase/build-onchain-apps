import useActiveLink from './useActiveLink';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/test',
    isReady: true,
  }),
}));

describe('useActiveLink', () => {
  // TODO Add real tests
  it('should be defined', () => {
    expect(useActiveLink).toBeDefined();
  });
});
