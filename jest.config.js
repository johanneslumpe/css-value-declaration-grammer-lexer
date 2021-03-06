const { defaults } = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: ['/node_modules', '__tests__/utils'],
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.cjs.json',
    },
  },
};
