import globals from "globals";
import eslintConfigESLint from "eslint-config-eslint";
import eslintConfigESLintFormatting from "eslint-config-eslint/formatting";

export default [
    ...eslintConfigESLint,
    eslintConfigESLintFormatting,
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
