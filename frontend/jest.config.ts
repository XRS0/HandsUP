module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/src/setupTests.tsx'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.jest.json',
      }
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-markdown|remark-gfm|vfile|unist-.*|unified)/)'
  ],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  moduleDirectories: ['node_modules', '<rootDir>/__mocks__', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(jpg|png|svg|wav|mp3)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.svg\\?react$': '<rootDir>/__mocks__/svgComponentMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',

    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/shared/assets/$1',
    '^@views/(.*)$': '<rootDir>/src/views/$1',
  },
};