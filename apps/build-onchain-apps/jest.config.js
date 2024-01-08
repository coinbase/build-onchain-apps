const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'pages/api/**/*.{ts,tsx}',
    '!src/onchain/**/index.ts',
    '!**/node_modules/**',
  ],
  coverageReporters: ['clover', 'json', 'lcov', 'text'],
  roots: ['<rootDir>/src', '<rootDir>/pages/api'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = [
    // this is one of wagmi's deps. It's a native ES module, and jest doesn't
    // currently support those. Adding it here transpiles it before running tests.
    'node_modules/@tanstack/query-sync-storage-persister',
  ];
  return config;
};
