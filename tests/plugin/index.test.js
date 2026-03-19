/**
 * @fileoverview Plugin generator tests
 * @author Nicholas C. Zakas
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import assert from "node:assert";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import helpers, { result } from "yeoman-test";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const PLUGIN_GENERATOR_PATH = fileURLToPath(
	new URL("../../plugin/index.js", import.meta.url),
);

describe("ESLint Plugin Generator", () => {
	describe("general case", () => {
		beforeEach(async () => {
			await helpers
				.run(PLUGIN_GENERATOR_PATH)
				.withAnswers({
					userName: "John Doe",
					pluginId: "foo-bar",
					desc: "my description",
					hasRules: false,
					hasProcessors: false,
				})
				.withOptions({ "skip-install": true });
		});

		it("creates expected files", () => {
			const expected = [
				"lib/index.js",
				"package.json",
				"README.md",
				"eslint.config.mjs",
			];

			result.assertFile(expected);
		});

		it("has correct package.json", () => {
			result.assertJsonFileContent("package.json", {
				name: "eslint-plugin-foo-bar",
				author: "John Doe",
				description: "my description",
			});
		});

		it("has correct README.md", () => {
			result.assertFileContent("README.md", "# eslint-plugin-foo-bar");
			result.assertFileContent(
				"README.md",
				"Next, install `eslint-plugin-foo-bar`:",
			);
			result.assertFileContent(
				"README.md",
				"npm install eslint-plugin-foo-bar --save-dev",
			);
			result.assertFileContent(
				"README.md",
				"add `foo-bar` to the `plugins` key",
			);

			result.assertNoFileContent(
				"README.md",
				"Then configure the rules you want to use under the `rules` key.",
			);
		});

		it("has correct lib/index.js", () => {
			result.assertNoFileContent(
				"lib/index.js",
				"module.exports.processors = {",
			);
			result.assertNoFileContent(
				"lib/index.js",
				'module.exports.rules = requireIndex(__dirname + "/rules");',
			);

			result.assertFileContent(
				"lib/index.js",
				"@fileoverview my description",
			);
			result.assertFileContent("lib/index.js", "@author John Doe");
		});
	});

	describe("when rules are expected", () => {
		beforeEach(async () => {
			await helpers
				.run(PLUGIN_GENERATOR_PATH)
				.withAnswers({
					userName: "John Doe",
					pluginId: "foo-bar",
					desc: "my description",
					hasRules: true,
					hasProcessors: false,
				})
				.withOptions({ "skip-install": true });
		});

		it("creates expected files", () => {
			const expected = ["lib/index.js", "package.json", "README.md"];

			assert.ok(existsSync(join(result.cwd, "lib", "rules")));
			assert.ok(existsSync(join(result.cwd, "tests", "lib", "rules")));
			result.assertFile(expected);
		});

		it("has correct lib/index.js", () => {
			result.assertFileContent(
				"lib/index.js",
				'module.exports.rules = requireIndex(__dirname + "/rules");',
			);
			result.assertNoFileContent(
				"lib/index.js",
				"module.exports.processors = {",
			);
		});

		it("has correct README.md", () => {
			result.assertFileContent(
				"README.md",
				'"foo-bar/rule-name": "warn"',
			);
		});
	});

	describe("when processors are expected", () => {
		beforeEach(async () => {
			await helpers
				.run(PLUGIN_GENERATOR_PATH)
				.withAnswers({
					userName: "John Doe",
					pluginId: "foo-bar",
					desc: "my description",
					hasRules: false,
					hasProcessors: true,
				})
				.withOptions({ "skip-install": true });
		});

		it("creates expected files", () => {
			const expected = ["lib/index.js", "package.json", "README.md"];

			assert.ok(existsSync(join(result.cwd, "lib", "processors")));
			assert.ok(
				existsSync(join(result.cwd, "tests", "lib", "processors")),
			);
			result.assertFile(expected);
		});

		it("has correct lib/index.js", () => {
			result.assertFileContent(
				"lib/index.js",
				"module.exports.processors = {",
			);
			result.assertNoFileContent(
				"lib/index.js",
				'module.exports.rules = requireIndex(__dirname + "/rules");',
			);
		});

		it("has correct README.md", () => {
			result.assertNoFileContent("README.md", '"foo-bar/rule-name": 2');
		});
	});

	describe("With pathological input", () => {
		describe("With eslint-plugin prefix provided in plugin ID", () => {
			beforeEach(async () => {
				await helpers
					.run(PLUGIN_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						pluginId: "eslint-plugin-foo-bar",
						desc: "my description",
						hasRules: false,
						hasProcessors: false,
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct package.json", () => {
				result.assertJsonFileContent("package.json", {
					name: "eslint-plugin-foo-bar",
				});
			});
		});

		describe("Double quotes in description", () => {
			beforeEach(async () => {
				await helpers
					.run(PLUGIN_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						pluginId: "foo-bar",
						desc: 'My "foo"',
						hasRules: false,
						hasProcessors: false,
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct package.json", () => {
				result.assertJsonFileContent("package.json", {
					description: 'My "foo"',
				});
			});
		});

		describe("Double quotes in username", () => {
			beforeEach(async () => {
				await helpers
					.run(PLUGIN_GENERATOR_PATH)
					.withAnswers({
						userName: 'Kevin "platinumazure" Partington',
						pluginId: "foo-bar",
						desc: "my description",
						hasRules: false,
						hasProcessors: false,
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct package.json", () => {
				result.assertJsonFileContent("package.json", {
					author: 'Kevin "platinumazure" Partington',
				});
			});
		});

		describe("Single quotes in description", () => {
			beforeEach(async () => {
				await helpers
					.run(PLUGIN_GENERATOR_PATH)
					.withAnswers({
						userName: "John Doe",
						pluginId: "foo-bar",
						desc: "My 'foo'",
						hasRules: false,
						hasProcessors: false,
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct package.json", () => {
				result.assertJsonFileContent("package.json", {
					description: "My 'foo'",
				});
			});
		});

		describe("Single quotes in username", () => {
			beforeEach(async () => {
				await helpers
					.run(PLUGIN_GENERATOR_PATH)
					.withAnswers({
						userName: "Kevin 'platinumazure' Partington",
						pluginId: "foo-bar",
						desc: "my description",
						hasRules: false,
						hasProcessors: false,
					})
					.withOptions({ "skip-install": true });
			});

			it("has correct package.json", () => {
				result.assertJsonFileContent("package.json", {
					author: "Kevin 'platinumazure' Partington",
				});
			});
		});
	});
});
