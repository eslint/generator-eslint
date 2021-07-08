/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

/* eslint no-invalid-this:0 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs"),
    path = require("path"),
    importFresh = require("import-fresh"),
    helpers = require("yeoman-test"),
    assert = require("yeoman-assert");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const testDirectory = path.join(__dirname, "../../temp");

describe("ESLint Rule Generator", () => {
    beforeEach(function(done) {
        helpers.testDirectory(testDirectory, err => {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:rule", [
                "../rule"
            ]);
            return done();
        });
    });

    it("creates expected files", function(done) {

        const expected = [
            "docs/rules/foo-bar.md",
            "lib/rules/foo-bar.js",
            "tests/lib/rules/foo-bar.js"
        ];

        helpers.mockPrompt(this.rule, {
            userName: "Foo Bar",
            ruleId: "foo-bar",
            desc: "My foo",
            invalidCode: "var x;",
            target: "eslint"
        });
        this.rule.options["skip-install"] = true;
        this.rule.run(() => {
            assert.file(expected);
            done();
        });
    });

    describe("With pathological input", () => {
        describe("Double quotes in description", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My \"foo\"",
                    invalidCode: "var x;",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting rule file", () => {
                beforeEach(function() {
                    this.resultRuleModule = importFresh(path.join(testDirectory, "lib", "rules", "test-rule"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultRuleModule);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultRuleModule.meta.docs.description, "My \"foo\"");
                });
            });
        });

        describe("Double quotes in code snippet", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My foo",
                    invalidCode: "var x = \"foo\";",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting test file", () => {
                beforeEach(function() {
                    this.resultTestModuleContent = fs.readFileSync(path.join(testDirectory, "tests", "lib", "rules", "test-rule.js"), "utf8");
                });

                it("should be readable", function() {
                    assert.ok(this.resultTestModuleContent);
                });

                it("should have correct code snippet", function() {
                    assert.ok(this.resultTestModuleContent.indexOf("code: \"var x = \\\"foo\\\";\"") > -1);
                });
            });
        });

        describe("Single quotes in description", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My 'foo'",
                    invalidCode: "var x;",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting rule file", () => {
                beforeEach(function() {
                    this.resultRuleModule = importFresh(path.join(testDirectory, "lib", "rules", "test-rule"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultRuleModule);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultRuleModule.meta.docs.description, "My 'foo'");
                });
            });
        });

        describe("Single quotes in code snippet", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My foo",
                    invalidCode: "var x = 'foo';",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting test file", () => {
                beforeEach(function() {
                    this.resultTestModuleContent = fs.readFileSync(path.join(testDirectory, "tests", "lib", "rules", "test-rule.js"), "utf8");
                });

                it("should be readable", function() {
                    assert.ok(this.resultTestModuleContent);
                });

                it("should have correct code snippet", function() {
                    assert.ok(this.resultTestModuleContent.indexOf("code: \"var x = 'foo';\"") > -1);
                });
            });
        });
    });
});
