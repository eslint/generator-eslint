import config from "eslint-config-eslint";
import globals from "globals";

export default [
    ...config,
    {
        files: ["tests/**/*.js"],
        languageOptions: { globals: globals.mocha }
    }
];
