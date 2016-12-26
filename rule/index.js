/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Generator = require("yeoman-generator");
var validators = require("../lib/validators");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isRuleId = validators.isRuleId;
var isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = Generator.extend({
    prompting: function() {
        var cb = this.async();

        var prompts = [{
            type: "input",
            name: "userName",
            message: "What is your name?"
        }, {
            type: "list",
            name: "target",
            message: "Where will this rule be published?",
            choices: [
                { name: "ESLint Core", value: "eslint" },
                { name: "ESLint Plugin", value: "plugin" }
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
        }];

        this.prompt(prompts).then(function(props) {
            this.ruleId = props.ruleId;
            this.invalidCode = props.invalidCode;
            this.target = props.target;
            this.desc = props.desc;
            this.userName = props.userName;
            this.year = (new Date()).getFullYear();

            cb();

        }.bind(this));
    },

    writing: function() {
        this.fs.copyTpl(
            this.templatePath("_doc.md"),
            this.destinationPath("docs/rules/" + this.ruleId + ".md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("_rule.js"),
            this.destinationPath("lib/rules/" + this.ruleId + ".js"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("_test.js"),
            this.destinationPath("tests/lib/rules/" + this.ruleId + ".js"),
            this
        );
    }
});
