/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */


/* eslint no-undefined:0 */
/* global describe, it*/
"use strict";

var assert = require("assert");

describe("eslint generator", function() {
    it("can be imported without blowing up", function() {
        var app = require("../rule");
        assert(app !== undefined);
    });
});
