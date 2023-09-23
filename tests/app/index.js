/**
 * @fileoverview Main generator tests
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import helpers from "yeoman-test";
import assert from "yeoman-assert";
import { fileURLToPath } from "node:url";
import path from "node:path";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const APP_GENERATOR_PATH = path.join(__dirname, "..", "..", "app", "index.js");
const RULE_GENERATOR_PATH = path.join(__dirname, "..", "..", "rule", "index.js");
const PLUGIN_GENERATOR_PATH = path.join(__dirname, "..", "..", "plugin", "index.js");

describe("ESLint Main Generator", () => {
    describe("User answers with Plugin", () => {
        beforeEach(async () => {
            await helpers.run(APP_GENERATOR_PATH)
                .withAnswers({
                    outputType: "Plugin",
                    userName: "John Doe",
                    pluginId: "foo-bar",
                    desc: "my description",
                    hasRules: false,
                    hasProcessors: false
                })
                .withOptions({ "skip-install": true })
                .withGenerators([
                    RULE_GENERATOR_PATH,
                    PLUGIN_GENERATOR_PATH
                ]);
        });

        // Just make sure the Plugin generator ran. More thorough tests are in the separate Plugin test file.
        it("creates expected files", () => {
            const expected = [
                "lib/index.js",
                "package.json",
                "README.md",
                ".eslintrc.js"
            ];

            assert.file(expected);
        });
    });

    describe("User answers with Rule", () => {
        beforeEach(async () => {
            await helpers.run(APP_GENERATOR_PATH)
                .withAnswers({
                    outputType: "Rule",
                    userName: "John Doe",
                    ruleId: "no-unused-vars",
                    desc: "Don't include unused variables.",
                    invalidCode: "x;",
                    target: "plugin"
                })
                .withOptions({ "skip-install": true })
                .withGenerators([
                    RULE_GENERATOR_PATH,
                    PLUGIN_GENERATOR_PATH
                ]);
        });

        // Just make sure the Rule generator ran. More thorough tests are in the separate Rule test file.
        it("creates expected files", async () => {
            const expected = [
                "docs/rules/no-unused-vars.md",
                "lib/rules/no-unused-vars.js",
                "tests/lib/rules/no-unused-vars.js"
            ];

            assert.file(expected);
        });
    });
});
