/**
 * @fileoverview Rule validators tests
 * @author Mitchell Amihod
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { strictEqual } from "node:assert";
import { isPluginId, isRuleId } from "../../lib/validators.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("validation helpers", () => {
    it("some valid plugin names", () => {
        strictEqual(isPluginId("eslint-plugin-foo"), true);
        strictEqual(isPluginId("foo-bar"), true);
    });

    it("plugin id can contain numbers", () => {
        strictEqual(isPluginId("eslint-plugin-e4x"), true);
    });

    it("some valid rule names", () => {
        strictEqual(isRuleId("rule-foo-bar"), true);
        strictEqual(isRuleId("foo-bar"), true);
    });

    it("rule id can contain numbers", () => {
        strictEqual(isRuleId("rule-1234"), true);
    });
});
