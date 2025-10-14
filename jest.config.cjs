// backend/jest.config.cjs
module.exports = {
  preset: 'ts-jest/presets/js-with-ts', // garante suporte a TS + JS
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': ['ts-jest', { useESM: true }], // transforma TS usando ESM
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};
