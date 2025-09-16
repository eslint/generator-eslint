/**
 * @fileoverview Rule generator tests
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

const RULE_GENERATOR_PATH = path.join(__dirname, "..", "..", "rule", "index.js");

describe("ESLint Rule Generator", () => {
    describe("general case", () => {
        beforeEach(async () => {
            await helpers.run(RULE_GENERATOR_PATH)
                .withPrompts({
                    userName: "John Doe",
                    ruleId: "no-unused-vars",
                    desc: "Don't include unused variables.",
                    invalidCode: "x;",
                    target: "plugin"
                })
                .withOptions({ "skip-install": true });
        });

        it("creates expected files", () => {
            const expected = [
                "docs/rules/no-unused-vars.md",
                "lib/rules/no-unused-vars.js",
                "tests/lib/rules/no-unused-vars.js"
            ];

            assert.file(expected);
        });

        it("has correct rule implementation file contents", () => {
            assert.fileContent("lib/rules/no-unused-vars.js", "description: \"Don't include unused variables.\"");
            assert.fileContent("lib/rules/no-unused-vars.js", "@fileoverview Don't include unused variables.");
            assert.fileContent("lib/rules/no-unused-vars.js", "@author John Doe");
        });

        it("has correct rule doc file contents", () => {
            assert.fileContent("docs/rules/no-unused-vars.md", "# Don&#39;t include unused variables. (`no-unused-vars`)");
        });

        it("has correct rule test file contents", () => {
            assert.fileContent("tests/lib/rules/no-unused-vars.js", "RuleTester = require(\"eslint\").RuleTester;");
            assert.fileContent("tests/lib/rules/no-unused-vars.js", "ruleTester.run(\"no-unused-vars\", rule, {");
            assert.fileContent("tests/lib/rules/no-unused-vars.js", "code: \"x;\"");
        });
    });

    describe("when generating an ESLint core rule", () => {
        beforeEach(async () => {
            await helpers.run(RULE_GENERATOR_PATH)
                .withPrompts({
                    userName: "John Doe",
                    ruleId: "no-unused-vars",
                    desc: "Don't include unused variables.",
                    invalidCode: "var x = \"foo\";",
                    target: "eslint"
                })
                .withOptions({ "skip-install": true });
        });

        it("has correct rule test file contents", () => {
            assert.fileContent("tests/lib/rules/no-unused-vars.js", "RuleTester = require(\"../../../lib/rule-tester\");");
        });
    });

    describe("With pathological input", () => {
        describe("Double quotes in description", () => {
            beforeEach(async () => {
                await helpers.run(RULE_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        ruleId: "no-unused-vars",
                        desc: "My \"foo\"",
                        invalidCode: "x;",
                        target: "plugin"
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct description", () => {
                assert.fileContent("lib/rules/no-unused-vars.js", "description: \"My \\\"foo\\\"\"");
            });
        });

        describe("Double quotes in code snippet", () => {
            beforeEach(async () => {
                await helpers.run(RULE_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        ruleId: "no-unused-vars",
                        desc: "Don't include unused variables.",
                        invalidCode: "var x = \"foo\";",
                        target: "plugin"
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct code snippet", () => {
                assert.fileContent("tests/lib/rules/no-unused-vars.js", "code: \"var x = \\\"foo\\\";\"");
            });
        });

        describe("Single quotes in description", () => {
            beforeEach(async () => {
                await helpers.run(RULE_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        ruleId: "no-unused-vars",
                        desc: "My 'foo'",
                        invalidCode: "x;",
                        target: "plugin"
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct description", () => {
                assert.fileContent("lib/rules/no-unused-vars.js", "description: \"My 'foo'\"");
            });
        });

        describe("Single quotes in code snippet", () => {
            beforeEach(async () => {
                await helpers.run(RULE_GENERATOR_PATH)
                    .withPrompts({
                        userName: "John Doe",
                        ruleId: "no-unused-vars",
                        desc: "Don't include unused variables.",
                        invalidCode: "var x = 'foo';",
                        target: "plugin"
                    })
                    .withOptions({ "skip-install": true });
            });

            it("has correct code snippet", () => {
                assert.fileContent("tests/lib/rules/no-unused-vars.js", "code: \"var x = 'foo';\"");
            });
        });
    });
});
