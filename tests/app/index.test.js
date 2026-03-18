/**
 * @fileoverview Main generator tests
 * @author Kevin Partington
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import helpers, { result } from "yeoman-test";
import { fileURLToPath } from "node:url";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const APP_GENERATOR_PATH = fileURLToPath(
	new URL("../../app/index.js", import.meta.url),
);
const RULE_GENERATOR_PATH = fileURLToPath(
	new URL("../../rule/index.js", import.meta.url),
);
const PLUGIN_GENERATOR_PATH = fileURLToPath(
	new URL("../../plugin/index.js", import.meta.url),
);

describe("ESLint Main Generator", () => {
	describe("User answers with Plugin", () => {
		beforeEach(async () => {
			await helpers
				.run(APP_GENERATOR_PATH)
				.withAnswers({
					outputType: "Plugin",
					userName: "John Doe",
					pluginId: "foo-bar",
					desc: "my description",
					hasRules: false,
					hasProcessors: false,
				})
				.withOptions({ "skip-install": true })
				.withGenerators([RULE_GENERATOR_PATH, PLUGIN_GENERATOR_PATH]);
		});

		// Just make sure the Plugin generator ran. More thorough tests are in the separate Plugin test file.
		it("creates expected files", () => {
			const expected = [
				"lib/index.js",
				"package.json",
				"README.md",
				"eslint.config.mjs",
			];

			result.assertFile(expected);
		});
	});

	describe("User answers with Rule", () => {
		beforeEach(async () => {
			await helpers
				.run(APP_GENERATOR_PATH)
				.withAnswers({
					outputType: "Rule",
					userName: "John Doe",
					ruleId: "no-unused-vars",
					desc: "Don't include unused variables.",
					invalidCode: "x;",
					target: "plugin",
				})
				.withOptions({ "skip-install": true })
				.withGenerators([RULE_GENERATOR_PATH, PLUGIN_GENERATOR_PATH]);
		});

		// Just make sure the Rule generator ran. More thorough tests are in the separate Rule test file.
		it("creates expected files", async () => {
			const expected = [
				"docs/rules/no-unused-vars.md",
				"lib/rules/no-unused-vars.js",
				"tests/lib/rules/no-unused-vars.js",
			];

			result.assertFile(expected);
		});
	});
});
