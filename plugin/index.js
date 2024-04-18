/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import Generator from "yeoman-generator";
import { mkdirSync } from "node:fs";
import { isPluginId, isRequired } from "../lib/validators.js";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

/**
 *
 */
export default class extends Generator {
    async prompting() {
        const prompts = [{
            type: "input",
            name: "userName",
            message: "What is your name?"
        }, {
            type: "input",
            name: "pluginId",
            message: "What is the plugin ID?",
            validate: isPluginId
        }, {
            type: "input",
            name: "desc",
            message: "Type a short description of this plugin:",
            validate: isRequired
        }, {
            type: "confirm",
            name: "hasRules",
            message: "Does this plugin contain custom ESLint rules?",
            default: true
        }, {
            type: "confirm",
            name: "hasProcessors",
            message: "Does this plugin contain one or more processors?",
            default: false
        }];

        this.answers = await this.prompt(prompts);
        this.answers.pluginId = this.answers.pluginId.replace("eslint-plugin-", "");
    }

    writing() {
        this.fs.copyTpl(this.templatePath("_eslint.config.mjs"), this.destinationPath("eslint.config.mjs"), this.answers);
        this.fs.copyTpl(this.templatePath("_plugin.js"), this.destinationPath("lib/index.js"), this.answers);
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.answers);
        this.fs.copyTpl(this.templatePath("_README.md"), this.destinationPath("README.md"), this.answers);

        if (this.answers.hasRules) {
            mkdirSync(this.destinationPath("lib", "rules"), { recursive: true });
            mkdirSync(this.destinationPath("tests", "lib", "rules"), { recursive: true });
        }

        if (this.answers.hasProcessors) {
            mkdirSync(this.destinationPath("lib", "processors"), { recursive: true });
            mkdirSync(this.destinationPath("tests", "lib", "processors"), { recursive: true });
        }
    }
}
