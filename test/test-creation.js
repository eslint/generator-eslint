/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
/* eslint no-invalid-this:0 */
/* global describe, beforeEach, it*/
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

describe("ESLint Rule Generator", function() {
    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
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
});
