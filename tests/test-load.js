/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

"use strict";

const assert = require("assert");

describe("eslint generator", () => {
    it("can be imported without blowing up", () => {
        const app = require("../rule");

        assert.ok(app);
    });
});
