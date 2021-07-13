/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const Generator = require("yeoman-generator");

const validators = require("../lib/validators");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const isPluginId = validators.isPluginId;
const isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = class extends Generator {
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
        this.fs.copyTpl(this.templatePath("_.eslintrc.js"), this.destinationPath(".eslintrc.js"), this.answers);
        this.fs.copyTpl(this.templatePath("_plugin.js"), this.destinationPath("lib/index.js"), this.answers);
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.answers);
        this.fs.copyTpl(this.templatePath("_README.md"), this.destinationPath("README.md"), this.answers);
    }
};
