import globals from "globals";
import eslintConfigESLint from "eslint-config-eslint";

export default [
    ...eslintConfigESLint,
    {
        name: "generator-eslint/global-ignores",
        ignores: ["temp/", "*/templates/*"]
    },
    {
        name: "generator-eslint/test-files",
        files: ["tests/**/*.js"],
        languageOptions: { globals: globals.mocha }
    }
];
