/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

"use strict";

var assert = require("assert");

describe("eslint generator", function() {
    it("can be imported without blowing up", function() {
        var app = require("../rule");
        assert.ok(app);
    });
});
