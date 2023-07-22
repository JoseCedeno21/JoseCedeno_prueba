module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    setupFiles: ['dotenv/config'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};