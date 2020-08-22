module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["eslint-plugin-tsdoc"],
  extends: [
    "@aussiegeek/eslint-config-base",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "tsdoc/syntax": "warn",
  },
};
