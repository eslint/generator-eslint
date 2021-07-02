/**
 * @fileoverview Rule validators tests
 * @author Mitchell Amihod
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("assert");
const validators = require("../../lib/validators");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("validation helpers", () => {

    it("some valid plugin names", () => {
        assert(validators.isPluginId("eslint-plugin-foo") === true);
        assert(validators.isPluginId("foo-bar") === true);

    });

    it("plugin id can contain numbers", () => {
        assert(validators.isPluginId("eslint-plugin-e4x") === true);
    });

    it("some valid rule names", () => {
        assert(validators.isRuleId("rule-foo-bar") === true);
        assert(validators.isRuleId("foo-bar") === true);
    });

    it("rule id can contain numbers", () => {
        assert(validators.isRuleId("rule-1234") === true);
    });
});
