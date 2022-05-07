import { jsWithTsESM as tsjPreset } from 'ts-jest/presets';
import type { InitialOptionsTsJest } from 'ts-jest';
const config:InitialOptionsTsJest = {
    testEnvironment: 'jsdom',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    transform: {
        ...tsjPreset.transform,
        // [...]
      },
    transformIgnorePatterns: [
        "/node_modules/tslib/.+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ],
    collectCoverageFrom:[
        "src/**/*.{js,jsx,ts,tsx}",
    ],
    coveragePathIgnorePatterns:[
        "dist",
        "templates"
    ],
    setupFiles: ["jest-canvas-mock"],
    coverageReporters: ["json-summary", "text"],

};

export default config;