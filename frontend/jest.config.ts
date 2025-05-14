module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
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