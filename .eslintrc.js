module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },

  rules: {
    "node/no-unpublished-import": 0,
    "node/no-missing-import": [
      "error",
      {
        allowModules: [],
        resolvePaths: ["types"],
        tryExtensions: [".ts", ".json", ".node", ".js"],
      },
    ],
    "no-unused-expressions": 0,
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
  },
};
