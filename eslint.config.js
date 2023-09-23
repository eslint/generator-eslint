import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: globals.mocha,
            ecmaVersion: 2020
        }
    },
    {
        ignores: [
            "plugin/**/*.js",
            "rule/**/*.js",
        ]
    }
];
