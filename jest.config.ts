// // module.exports = {
// //   preset: 'ts-jest',
// //   testEnvironment: 'node',
// //   transform: {
// //     '^.+\\.ts$': 'ts-jest',
// //   },
// //   transformIgnorePatterns: [
// //     '/node_modules/(?!supertest)/',  // Make sure to transform 'supertest'
// //   ],
// //   extensionsToTreatAsEsm: ['.ts'],  // Treat TypeScript files as ESM
// //   globals: {
// //     'ts-jest': {
// //       useBabelrc: true,  // Use Babel for JS transformation if needed
// //     },
// //   },
// // };

// module.exports = {
//   preset: 'ts-jest',
//   transform: {
//     '^.+\\.(ts|tsx)?$': 'ts-jest',
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   }
// };

// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;