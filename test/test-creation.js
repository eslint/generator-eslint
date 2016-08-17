/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

/* eslint no-invalid-this:0 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require("fs"),
    path = require("path"),
    helpers = require("yeoman-test"),
    assert = require("yeoman-assert");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var testDirectory = path.join(__dirname, "temp");

describe("ESLint Rule Generator", function() {
    beforeEach(function(done) {
        helpers.testDirectory(testDirectory, function(err) {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:rule", [
                "../../rule"
            ]);
            return done();
        }.bind(this));
    });

    it("creates expected files", function(done) {

        var expected = [
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
        this.rule.run(function() {
            assert.file(expected);
            done();
        });
    });

    describe("With pathological input", function() {
        describe("Double quotes in description", function() {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My \"foo\"",
                    invalidCode: "var x = \"foo\";",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting rule file", function() {
                beforeEach(function() {
                    this.resultRuleModule = require(path.join(testDirectory, "lib", "rules", "test-rule"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultRuleModule);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultRuleModule.meta.docs.description, "My \"foo\"");
                });
            });
        });

        /*
         * TODO: (platinumazure) Uncomment when eslint/generator-eslint#44 is
         * fixed.
         */
//        describe("Single quotes in description", function() {
//            beforeEach(function(done) {
//                helpers.mockPrompt(this.rule, {
//                    userName: "",
//                    ruleId: "test-rule",
//                    desc: "My 'foo'",
//                    invalidCode: "var x;",
//                    target: "eslint"
//                });
//                this.rule.options["skip-install"] = true;
//                this.rule.run(done);
//            });
//
//            describe("Resulting rule file", function() {
//                beforeEach(function() {
//                    this.resultRuleModule = require(path.join(testDirectory, "lib", "rules", "test-rule"));
//                });
//
//                it("should be requireable", function() {
//                    assert.ok(this.resultRuleModule);
//                });
//
//                it("should have correct description", function() {
//                    assert.strictEqual(this.resultRuleModule.meta.docs.description, "My 'foo'");
//                });
//            });
//        });

        describe("Double quotes in code snippet", function() {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "",
                    ruleId: "test-rule",
                    desc: "My \"foo\"",
                    invalidCode: "var x = \"foo\";",
                    target: "eslint"
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting test file", function() {
                beforeEach(function() {
                    this.resultTestModuleContent = fs.readFileSync(path.join(testDirectory, "tests", "lib", "rules", "test-rule.js"), "utf8");
                });

                it("should be readable", function() {
                    assert.ok(this.resultTestModuleContent);
                });

                it("should have correct code snippet", function() {
                    assert.ok(this.resultTestModuleContent.indexOf("code: \"var x = \\\"foo\\\";") > -1);
                });
            });
        });
    });
});

describe("ESLint Plugin Generator", function() {
    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:plugin", [
                "../../plugin"
            ]);
            return done();
        }.bind(this));
    });

    it("creates expected files when rules are expected", function(done) {

        var expected = [
            "lib/rules",
            "tests/lib/rules",
            "lib/index.js",
            "package.json",
            "README.md"
        ];

        helpers.mockPrompt(this.rule, {
            userName: "Foo Bar",
            pluginId: "foo-bar",
            desc: "My foo",
            hasRules: true,
            hasProcessors: false
        });
        this.rule.options["skip-install"] = true;
        this.rule.run(function() {
            assert.file(expected);
            done();
        });
    });

    it("creates expected files when processors are expected", function(done) {

        var expected = [
            "lib/processors",
            "tests/lib/processors",
            "lib/index.js",
            "package.json",
            "README.md"
        ];

        helpers.mockPrompt(this.rule, {
            userName: "Foo Bar",
            pluginId: "eslint-plugin-foo-bar",
            desc: "My foo",
            hasRules: false,
            hasProcessors: true
        });
        this.rule.options["skip-install"] = true;
        this.rule.run(function() {
            assert.file(expected);
            done();
        });
    });

    describe("With pathological input", function() {
        describe("Double quotes in description", function() {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin \"platinumazure\" Partington",
                    pluginId: "test-plugin",
                    desc: "My \"foo\"",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", function() {
                beforeEach(function() {
                    this.resultPackageJson = require(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultPackageJson.description, "My \"foo\"");
                });
            });
        });

        /*
         * TODO: (platinumazure) Uncomment when eslint/generator-eslint#44 is
         * fixed.
         */
//        describe("Single quotes in description", function() {
//            beforeEach(function(done) {
//                helpers.mockPrompt(this.rule, {
//                    userName: "",
//                    pluginId: "test-plugin",
//                    desc: "My 'foo'",
//                    hasRules: false,
//                    hasProcessors: false,
//                });
//                this.rule.options["skip-install"] = true;
//                this.rule.run(done);
//            });
//
//            describe("Resulting package.json", function() {
//                beforeEach(function() {
//                    this.resultPackageJson = require(path.join(testDirectory, "package.json"));
//                });
//
//                it("should be requireable", function() {
//                    assert.ok(this.resultPackageJson);
//                });
//
//                it("should have correct description", function() {
//                    assert.strictEqual(this.resultPackageJson.description, "My 'foo'");
//                });
//            });
//        });

        describe("Double quotes in username", function() {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin \"platinumazure\" Partington",
                    pluginId: "test-plugin",
                    desc: "My \"foo\"",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", function() {
                beforeEach(function() {
                    this.resultPackageJson = require(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct author", function() {
                    assert.strictEqual(this.resultPackageJson.author, "Kevin \"platinumazure\" Partington");
                });
            });
        });
    });
});
