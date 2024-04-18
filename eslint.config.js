"use strict";
import eslintConfigESLint from "eslint-config-eslint";

export default [
    ...eslintConfigESLint,
    {files: ["tests/**/*.js"],
    languageOptions: { globals: globals.mocha }}
];
