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
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testTimeout: 8000,
};

module.exports = config;
