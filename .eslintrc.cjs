"use strict";

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020
    },
    extends: [
        "eslint"
    ],
    env: {
        node: true
    },
    overrides: [
        {
            files: ["tests/**/*.js"],
            env: { mocha: true }
        }
    ]
};
