export default {
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
    verbose: true
}