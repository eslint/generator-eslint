/**
 * @fileoverview Plugin generator tests
 * @author Nicholas C. Zakas
 */

/* eslint no-invalid-this:0 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path = require("path"),
    helpers = require("yeoman-test"),
    assert = require("yeoman-assert");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var testDirectory = path.join(__dirname, "../../temp");

describe("ESLint Plugin Generator", function() {
    beforeEach(function(done) {
        helpers.testDirectory(testDirectory, function(err) {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:plugin", [
                "../plugin"
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
