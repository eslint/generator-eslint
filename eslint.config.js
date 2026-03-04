import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigESLint from "eslint-config-eslint";
import globals from "globals";

export default defineConfig([
    globalIgnores(["temp/", "*/templates/*"]),
    eslintConfigESLint,
    {
        name: "generator-eslint/test-files",
        files: ["tests/**/*.test.js"],
        languageOptions: { globals: globals.mocha }
    }
]);
