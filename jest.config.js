module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testTimeout: 2000,
    testMatch: ["**/*.spec.ts"],
    collectCoverage: true,
    coverageDirectory: `<rootDir>/coverage`,
    coverageProvider: "v8",
    coverageReporters: ["text-summary"],
    collectCoverageFrom: ["<rootDir>/**/*.ts"],
    // coverageThreshold: {
    //     global: {
    //         branches: 30,
    //         functions: 25,
    //         lines: 25,
    //         statements: 25,
    //     },
    // },
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
};
