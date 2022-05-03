import { jsWithBabelESM as tsjPreset} from 'ts-jest/jest-preset';
import type { InitialOptionsTsJest } from 'ts-jest';
const config:InitialOptionsTsJest = {
    testEnvironment: 'jsdom',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    transform: {
        ...tsjPreset.transform,
        // [...]
      },
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ],
    setupFiles: ["jest-canvas-mock"],
    coverageReporters: ["json-summary"]
};

export default config;