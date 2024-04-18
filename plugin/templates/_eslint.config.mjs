import pluginJs from "@eslint/js";
import pluginNode from "eslint-plugin-n";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default [
    pluginJs.configs.recommended,
    pluginNode.configs["flat/recommended"],
    eslintPlugin.configs["flat/recommended"]
]
