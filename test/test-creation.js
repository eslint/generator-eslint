/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 * @copyright 2014 Nicholas C. Zakas. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/*global describe, beforeEach, it*/
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var path    = require("path"),
    helpers = require("yeoman-generator").test,
    assert  = require("yeoman-generator").assert;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("eslint generator", function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
            if (err) {
                return done(err);
            }

            this.rule = helpers.createGenerator("eslint:rule", [
                "../../rule"
            ]);
            done();
        }.bind(this));
    });

    it("creates expected files", function (done) {

        var expected = [
            "docs/rules/foo-bar.md",
            "lib/rules/foo-bar.js",
            "tests/lib/rules/foo-bar.js"
        ];

        helpers.mockPrompt(this.rule, {
            userName: "Foo Bar",
            ruleId: "foo-bar",
            desc: "My foo",
            invalidCode: "var x;"
        });
        this.rule.options["skip-install"] = true;
        this.rule.run(function () {
            assert.file(expected);
            done();
        });
    });
});
