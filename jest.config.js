const config = {
  testEnvironment: 'node',
  rootDir: './.',
  verbose: true,
  silent: false,
  detectOpenHandles: true,
  collectCoverage: true,
  cache: false,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/server.js/**',
    '!**/jest.config.js/**',
    '!**/api_docs/**',
  ],
  coverageReporters: [
    'text',
    'text-summary',
  ],
  testTimeout: 8000,
};

module.exports = config;
