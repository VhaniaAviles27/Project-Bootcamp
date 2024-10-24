export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-transformer-svg",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(png|jpg|webp|jpeg|webm)$": "<rootDir>/__mocks__/fileMock.js",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    extensionsToTreatAsEsm: [".ts",".tsx"],
    transform: {
        "^.+\\.(ts|js|tsx)$" : [
            "@swc/jest",
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: "automatic",
                        }
                    }
                }
            }
        ]
    },
    coverageThreshold : {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    }
}