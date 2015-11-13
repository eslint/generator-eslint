/*global describe, it*/
"use strict";

var assert = require("assert");
var validators = require("../lib/validators");

describe("validation helpers", function () {

    it("some valid plugin names", function () {
      assert(validators.isPluginId("eslint-plugin-foo") === true);
      assert(validators.isPluginId("foo-bar") === true);

    });

    it("plugin id can contain numbers", function () {
      assert(validators.isPluginId("eslint-plugin-e4x") === true);

    });

    it("some valid rule names", function () {
      assert(validators.isRuleId("rule-foo-bar") === true);
      assert(validators.isRuleId("foo-bar") === true);
    });

    it("rule id can contain numbers", function () {
      assert(validators.isRuleId("rule-1234") === true);
    });
});
