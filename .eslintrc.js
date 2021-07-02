"use strict";

module.exports = {
    root: true,
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
