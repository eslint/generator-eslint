/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const util = require("util");
const yeoman = require("yeoman-generator");
const validators = require("../lib/validators");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const isRuleId = validators.isRuleId;
const isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

const ESLintRuleGenerator = module.exports = function ESLintRuleGenerator() {
    yeoman.Base.apply(this, arguments); // eslint-disable-line prefer-rest-params
};

util.inherits(ESLintRuleGenerator, yeoman.Base);

ESLintRuleGenerator.prototype.askFor = function askFor() {
    const cb = this.async();

    const prompts = [{
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

    this.prompt(prompts, props => {
        this.ruleId = props.ruleId;
        this.invalidCode = props.invalidCode;
        this.target = props.target;
        this.desc = props.desc;
        this.userName = props.userName;
        this.year = (new Date()).getFullYear();

        cb();

    });
};

ESLintRuleGenerator.prototype.generate = function generate() {
    this.template("_doc.md", `docs/rules/${this.ruleId}.md`);
    this.template("_rule.js", `lib/rules/${this.ruleId}.js`);
    this.template("_test.js", `tests/lib/rules/${this.ruleId}.js`);
};
