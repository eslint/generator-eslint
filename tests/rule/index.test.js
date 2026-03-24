/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import helpers, { result } from "yeoman-test";
import { fileURLToPath } from "node:url";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const RULE_GENERATOR_PATH = fileURLToPath(
	new URL("../../rule/index.js", import.meta.url),
);

describe("ESLint Rule Generator", () => {
	describe("general case", () => {
		beforeEach(async () => {
			await helpers
				.run(RULE_GENERATOR_PATH)
				.withAnswers({
					userName: "John Doe",
					ruleId: "no-unused-vars",
					desc: "Don't include unused variables.",
					invalidCode: "x;",
					target: "plugin",
				})
				.withOptions({ "skip-install": true });
		});

		it("creates expected files", async () => {
			const expected = [
				"docs/rules/no-unused-vars.md",
				"lib/rules/no-unused-vars.js",
				"tests/lib/rules/no-unused-vars.js",
			];

			result.assertFile(expected);
		});

		it("has correct rule implementation file contents", () => {
			result.assertFileContent(
				"lib/rules/no-unused-vars.js",
				'description: "Don\'t include unused variables."',
			);
			result.assertFileContent(
				"lib/rules/no-unused-vars.js",
				"@fileoverview Don't include unused variables.",
			);
			result.assertFileContent(
				"lib/rules/no-unused-vars.js",
				"@author John Doe",
			);
		});

		it("has correct rule doc file contents", () => {
			result.assertFileContent(
				"docs/rules/no-unused-vars.md",
				"# Don&#39;t include unused variables. (`no-unused-vars`)",
			);
		});

		it("has correct rule test file contents", () => {
			result.assertFileContent(
				"tests/lib/rules/no-unused-vars.js",
				'RuleTester = require("eslint").RuleTester;',
			);
			result.assertFileContent(
				"tests/lib/rules/no-unused-vars.js",
				'ruleTester.run("no-unused-vars", rule, {',
			);
			result.assertFileContent(
				"tests/lib/rules/no-unused-vars.js",
				'code: "x;"',
			);
		});
	});

	describe("when generating an ESLint core rule", () => {
		beforeEach(async () => {
			await helpers
				.run(RULE_GENERATOR_PATH)
				.withAnswers({
					userName: "John Doe",
					ruleId: "no-unused-vars",
					desc: "Don't include unused variables.",
					invalidCode: 'var x = "foo";',
					target: "eslint",
				})
				.withOptions({ "skip-install": true });
		});

		it("has correct rule test file contents", () => {
			result.assertFileContent(
				"tests/lib/rules/no-unused-vars.js",
				'RuleTester = require("../../../lib/rule-tester");',
			);
		});
	});

	describe("With pathological input", () => {
		describe("Double quotes in description", () => {
			beforeEach(async () => {
				await helpers
					.run(RULE_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						ruleId: "no-unused-vars",
						desc: 'My "foo"',
						invalidCode: "x;",
						target: "plugin",
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct description", () => {
				result.assertFileContent(
					"lib/rules/no-unused-vars.js",
					'description: "My \\"foo\\""',
				);
			});
		});

		describe("Double quotes in code snippet", () => {
			beforeEach(async () => {
				await helpers
					.run(RULE_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						ruleId: "no-unused-vars",
						desc: "Don't include unused variables.",
						invalidCode: 'var x = "foo";',
						target: "plugin",
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct code snippet", () => {
				result.assertFileContent(
					"tests/lib/rules/no-unused-vars.js",
					'code: "var x = \\"foo\\";"',
				);
			});
		});

		describe("Single quotes in description", () => {
			beforeEach(async () => {
				await helpers
					.run(RULE_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						ruleId: "no-unused-vars",
						desc: "My 'foo'",
						invalidCode: "x;",
						target: "plugin",
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct description", () => {
				result.assertFileContent(
					"lib/rules/no-unused-vars.js",
					"description: \"My 'foo'\"",
				);
			});
		});

		describe("Single quotes in code snippet", () => {
			beforeEach(async () => {
				await helpers
					.run(RULE_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						ruleId: "no-unused-vars",
						desc: "Don't include unused variables.",
						invalidCode: "var x = 'foo';",
						target: "plugin",
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct code snippet", () => {
				result.assertFileContent(
					"tests/lib/rules/no-unused-vars.js",
					"code: \"var x = 'foo';\"",
				);
			});
		});
	});
});
