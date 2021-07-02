/**
 * @fileoverview Plugin generator tests
 * @author Nicholas C. Zakas
 */

/* eslint no-invalid-this:0 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const path = require("path"),
    requireUncached = require("require-uncached"),
    helpers = require("yeoman-test"),
    assert = require("yeoman-assert");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const testDirectory = path.join(__dirname, "../../temp");

describe("ESLint Plugin Generator", () => {
    beforeEach(function(done) {
        helpers.testDirectory(testDirectory, err => {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:plugin", [
                "../plugin"
            ]);
            return done();
        });
    });

    it("creates expected files when rules are expected", function(done) {

        const expected = [
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
        this.rule.run(() => {
            assert.file(expected);
            done();
        });
    });

    it("creates expected files when processors are expected", function(done) {

        const expected = [
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
        this.rule.run(() => {
            assert.file(expected);
            done();
        });
    });

    describe("With pathological input", () => {
        describe("Double quotes in description", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin platinumazure Partington",
                    pluginId: "test-plugin",
                    desc: "My \"foo\"",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", () => {
                beforeEach(function() {
                    this.resultPackageJson = requireUncached(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultPackageJson.description, "My \"foo\"");
                });
            });
        });

        describe("Double quotes in username", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin \"platinumazure\" Partington",
                    pluginId: "test-plugin",
                    desc: "My foo",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", () => {
                beforeEach(function() {
                    this.resultPackageJson = requireUncached(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct author", function() {
                    assert.strictEqual(this.resultPackageJson.author, "Kevin \"platinumazure\" Partington");
                });
            });
        });

        describe("Single quotes in description", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin platinumazure Partington",
                    pluginId: "test-plugin",
                    desc: "My 'foo'",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", () => {
                beforeEach(function() {
                    this.resultPackageJson = requireUncached(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct description", function() {
                    assert.strictEqual(this.resultPackageJson.description, "My 'foo'");
                });
            });
        });

        describe("Single quotes in username", () => {
            beforeEach(function(done) {
                helpers.mockPrompt(this.rule, {
                    userName: "Kevin 'platinumazure' Partington",
                    pluginId: "test-plugin",
                    desc: "My foo",
                    hasRules: false,
                    hasProcessors: false
                });
                this.rule.options["skip-install"] = true;
                this.rule.run(done);
            });

            describe("Resulting package.json", () => {
                beforeEach(function() {
                    this.resultPackageJson = requireUncached(path.join(testDirectory, "package.json"));
                });

                it("should be requireable", function() {
                    assert.ok(this.resultPackageJson);
                });

                it("should have correct author", function() {
                    assert.strictEqual(this.resultPackageJson.author, "Kevin 'platinumazure' Partington");
                });
            });
        });
    });
});
