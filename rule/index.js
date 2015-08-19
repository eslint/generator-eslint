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

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determines if a given ruleId is valid. This is used by the prompt system.
 * @param {string} ruleId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 * @private
 */
function isRuleId(ruleId) {
    if (/^(?:[a-z]+(?:\-[a-z]+)*)$/.test(ruleId)) {
        return true;
    } else {
        return "Rule ID must be all lowercase with dashes as separators.";
    }
}

/**
 * Validates that a value has been provided. This is used for validating
 * user input using prompts.
 * @param {string} value The inputted value.
 * @returns {string|boolean} A string if the value is an empty string, true
 *      if the value is not an empty string.
 * @private
 */
function isRequired(value) {
    if (value === "") {
        return "Please provide a value";
    } else {
        return true;
    }
}

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
