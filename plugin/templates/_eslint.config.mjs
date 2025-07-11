import { defineConfig } from "eslint/config";
import pluginJs from "@eslint/js";
import pluginNode from "eslint-plugin-n";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default defineConfig([
    {
        name: "eslint/js",
        plugins: {
            js: pluginJs,
        },
        extends: [""],
    },
    {
        name: "eslint/node",
        plugins: {
            n: pluginNode,
        },
        extends: [""],
    },
    {
        name: "eslint/eslint-plugin",
        plugins: {
            "eslint-plugin": eslintPlugin,
        },
        extends: ["eslint-plugin/flat/recommended"],
    }
]);
