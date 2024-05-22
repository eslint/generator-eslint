/**
 * @fileoverview Plugin generator tests
 * @author Nicholas C. Zakas
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

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // eslint-disable-line no-underscore-dangle -- cjs convention

const PLUGIN_GENERATOR_PATH = path.join(__dirname, "..", "..", "plugin", "index.js");

describe("ESLint Plugin Generator", () => {
    describe("general case", () => {
        beforeEach(async () => {
            await helpers.run(PLUGIN_GENERATOR_PATH)
                .withPrompts({
                    userName: "John Doe",
                    pluginId: "foo-bar",
                    desc: "my description",
                    hasRules: false,
                    hasProcessors: false
                })
                .withOptions({ "skip-install": true });
        });

        it("creates expected files", () => {
            const expected = [
                "lib/index.js",
                "package.json",
                "README.md",
                "eslint.config.mjs"
            ];

            assert.file(expected);
        });

        it("has correct package.json", () => {
            assert.jsonFileContent("package.json", {
                name: "eslint-plugin-foo-bar",
                author: "John Doe",
                description: "my description"
            });
        });

        it("has correct README.md", () => {
            assert.fileContent("README.md", "# eslint-plugin-foo-bar");
            assert.fileContent("README.md", "Next, install `eslint-plugin-foo-bar`:");
            assert.fileContent("README.md", "npm install eslint-plugin-foo-bar --save-dev");
            assert.fileContent("README.md", "Add `foo-bar` to the plugins section");

            assert.noFileContent("README.md", "Then configure the rules you want to use under the rules section.");
        });

        it("has correct lib/index.js", () => {
            assert.noFileContent("lib/index.js", "module.exports.processors = {");
            assert.noFileContent("lib/index.js", "module.exports.rules = requireIndex(__dirname + \"/rules\");");

            assert.fileContent("lib/index.js", "@fileoverview my description");
            assert.fileContent("lib/index.js", "@author John Doe");
        });
    });

    describe("when rules are expected", () => {
        beforeEach(async () => {
            await helpers.run(PLUGIN_GENERATOR_PATH)
                .withPrompts({
                    userName: "John Doe",
                    pluginId: "foo-bar",
                    desc: "my description",
                    hasRules: true,
                    hasProcessors: false
                })
                .withOptions({ "skip-install": true });
        });

        it("creates expected files", () => {
            const expected = [
                "lib/rules",
                "tests/lib/rules",
                "lib/index.js",
                "package.json",
                "README.md"
            ];

            assert.file(expected);
        });

        it("has correct lib/index.js", () => {
            assert.fileContent("lib/index.js", "module.exports.rules = requireIndex(__dirname + \"/rules\");");
            assert.noFileContent("lib/index.js", "module.exports.processors = {");
        });

        it("has correct README.md", () => {
            assert.fileContent("README.md", "\"foo-bar/rule-name\": 2");
        });
    });

    describe("when processors are expected", () => {
        beforeEach(async () => {
            await helpers.run(PLUGIN_GENERATOR_PATH)
                .withPrompts({
                    userName: "John Doe",
                    pluginId: "foo-bar",
                    desc: "my description",
                    hasRules: false,
                    hasProcessors: true
                })
                .withOptions({ "skip-install": true });
        });

        it("creates expected files", () => {
            const expected = [
                "lib/processors",
                "tests/lib/processors",
                "lib/index.js",
                "package.json",
                "README.md"
            ];

            assert.file(expected);
        });

        it("has correct lib/index.js", () => {
            assert.fileContent("lib/index.js", "module.exports.processors = {");
            assert.noFileContent("lib/index.js", "module.exports.rules = requireIndex(__dirname + \"/rules\");");
        });

        it("has correct README.md", () => {
            assert.noFileContent("README.md", "\"foo-bar/rule-name\": 2");
        });
    });

    describe("With pathological input", () => {
        describe("With eslint-plugin prefix provided in plugin ID", () => {
            beforeEach(async () => {
                await helpers.run(PLUGIN_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        pluginId: "eslint-plugin-foo-bar",
                        desc: "my description",
                        hasRules: false,
                        hasProcessors: false
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct package.json", () => {
                assert.jsonFileContent("package.json", { name: "eslint-plugin-foo-bar" });
            });
        });

        describe("Double quotes in description", () => {
            beforeEach(async () => {
                await helpers.run(PLUGIN_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        pluginId: "foo-bar",
                        desc: "My \"foo\"",
                        hasRules: false,
                        hasProcessors: false
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct package.json", () => {
                assert.jsonFileContent("package.json", { description: "My \"foo\"" });
            });
        });

        describe("Double quotes in username", () => {
            beforeEach(async () => {
                await helpers.run(PLUGIN_GENERATOR_PATH)
                    .withPrompts({
                        userName: "Kevin \"platinumazure\" Partington",
                        pluginId: "foo-bar",
                        desc: "my description",
                        hasRules: false,
                        hasProcessors: false
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct package.json", () => {
                assert.jsonFileContent("package.json", { author: "Kevin \"platinumazure\" Partington" });
            });
        });

        describe("Single quotes in description", () => {
            beforeEach(async () => {
                await helpers.run(PLUGIN_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        pluginId: "foo-bar",
                        desc: "My 'foo'",
                        hasRules: false,
                        hasProcessors: false
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct package.json", () => {
                assert.jsonFileContent("package.json", { description: "My 'foo'" });
            });
        });

        describe("Single quotes in username", () => {
            beforeEach(async () => {
                await helpers.run(PLUGIN_GENERATOR_PATH)
                    .withPrompts({
                        userName: "Kevin 'platinumazure' Partington",
                        pluginId: "foo-bar",
                        desc: "my description",
                        hasRules: false,
                        hasProcessors: false
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct package.json", () => {
                assert.jsonFileContent("package.json", { author: "Kevin 'platinumazure' Partington" });
            });
        });
    });
});
