"use strict";

module.exports = {
    root: true,
    extends: [
        "eslint",
        "plugin:eslint-comments/recommended"
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
