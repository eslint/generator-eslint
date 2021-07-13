/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
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

const isRuleId = validators.isRuleId;
const isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = class extends Generator {
    async prompting() {
        const prompts = [
            {
                type: "input",
                name: "userName",
                message: "What is your name?"
            }, {
                type: "list",
                name: "target",
                message: "Where will this rule be published?",
                choices: [
                    { name: "ESLint Plugin", value: "plugin" },
                    { name: "ESLint Core", value: "eslint" }
                ]
            }, {
                type: "input",
                name: "ruleId",
                message: "What is the rule ID?",
                validate: isRuleId
            }, {
                type: "input",
                name: "desc",
                message: "Type a short description of this rule:",
                validate: isRequired
            }, {
                type: "input",
                name: "invalidCode",
                message: "Type a short example of the code that will fail:"
            }
        ];

        this.answers = await this.prompt(prompts);
    }

    writing() {
        this.fs.copyTpl(this.templatePath("_doc.md"), this.destinationPath("docs", "rules", `${this.answers.ruleId}.md`), this.answers);
        this.fs.copyTpl(this.templatePath("_rule.js"), this.destinationPath("lib", "rules", `${this.answers.ruleId}.js`), this.answers);
        this.fs.copyTpl(this.templatePath("_test.js"), this.destinationPath("tests", "lib", "rules", `${this.answers.ruleId}.js`), this.answers);
    }
};
