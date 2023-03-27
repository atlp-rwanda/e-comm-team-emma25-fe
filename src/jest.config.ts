export default {
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: '../coverage',
    collectCoverage: true,
    verbose: true,
}