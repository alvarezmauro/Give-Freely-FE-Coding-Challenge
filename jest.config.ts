export {};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/$1",

    // mocking assests and styling
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/mocks/fileMock.ts",
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/tests/mocks/styleMock.ts",
    /* mock models and services folder */
    "(assets|models|services)": "<rootDir>/tests/mocks/fileMock.ts"
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.ts?$": ["ts-jest", { useESM: true, tsconfig: { jsx: "react-jsx" } }],
    "^.+\\.tsx?$": [
      "ts-jest",
      { useESM: true, tsconfig: { jsx: "react-jsx" } }
    ],
    "^.+\\.js?$": ["babel-jest", { useESM: true }],
    "^.+\\.jsx?$": ["babel-jest", { useESM: true }]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom"
};
