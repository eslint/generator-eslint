import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import eslintConfigESLint from "eslint-config-eslint";
import eslintConfigESLintFormatting from "eslint-config-eslint/formatting";

export default defineConfig([
    eslintConfigESLint,
    eslintConfigESLintFormatting,
    globalIgnores(["temp/", "*/templates/*"]),
    {
        name: "generator-eslint/test-files",
        files: ["tests/**/*.test.js"],
        languageOptions: { globals: globals.mocha }
    }
]);
