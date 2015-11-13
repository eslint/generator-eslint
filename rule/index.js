/**
 * @fileoverview Rule generator
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var validators = require("../lib/validators");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isRuleId = validators.isRuleId;
var isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

var ESLintRuleGenerator = module.exports = function ESLintRuleGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
};

util.inherits(ESLintRuleGenerator, yeoman.generators.Base);

ESLintRuleGenerator.prototype.askFor = function askFor() {
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
        message: "Type a short example of the code that will fail:",
    }];

    this.prompt(prompts, function (props) {
        this.ruleId = props.ruleId;
        this.invalidCode = props.invalidCode;
        this.target = props.target;
        this.desc = props.desc;
        this.userName = props.userName;
        this.year = (new Date()).getFullYear();

        cb();

    }.bind(this));


};

ESLintRuleGenerator.prototype.generate = function generate() {

    this.template("_doc.md", "docs/rules/" + this.ruleId + ".md");
    this.template("_rule.js", "lib/rules/" + this.ruleId + ".js");
    this.template("_test.js", "tests/lib/rules/" + this.ruleId + ".js");
};
