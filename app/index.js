/**
 * @fileoverview Main generator (delegates to rule or plugin generator)
 * @author Kevin Partington
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Generator from "yeoman-generator";
import RuleGenerator from "../rule/index.js";
import PluginGenerator from "../plugin/index.js";
import { fileURLToPath } from "node:url"; // eslint-disable-line node/no-missing-import -- https://github.com/mysticatea/eslint-plugin-node/issues/275
import path from "node:path"; // eslint-disable-line node/no-missing-import -- https://github.com/mysticatea/eslint-plugin-node/issues/275

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // eslint-disable-line no-underscore-dangle

const RULE_GENERATOR_PATH = path.join(__dirname, "..", "rule", "index.js");
const PLUGIN_GENERATOR_PATH = path.join(__dirname, "..", "plugin", "index.js");

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

export default class extends Generator {
    async prompting() {
        const answers = await this.prompt({
            type: "list",
            name: "outputType",
            message: "Do you want to generate a rule or a plugin?",
            choices: ["Rule", "Plugin"],
            default: "Rule"
        });

        if (answers.outputType === "Rule") {
            this.composeWith({ Generator: RuleGenerator, path: RULE_GENERATOR_PATH });
        } else if (answers.outputType === "Plugin") {
            this.composeWith({ Generator: PluginGenerator, path: PLUGIN_GENERATOR_PATH });
        } else {
            throw new Error("Unhandled generator type.");
        }
    }
}
