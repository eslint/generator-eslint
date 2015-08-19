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
 * Determines if a given pluginId is valid. This is used by the prompt system.
 * @param {string} pluginId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 * @private
 */
function isPluginId(pluginId) {
    if (/^(?:[a-z]+(?:\-[a-z]+)*)$/.test(pluginId)) {
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

var ESLintPluginGenerator = module.exports = function ESLintPluginGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
};

util.inherits(ESLintPluginGenerator, yeoman.generators.Base);

ESLintPluginGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
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
        type: "checkbox",
        name: "hasRules",
        message: "Does this plugin contain custom ESLint rules?"
    }, {
        type: "checkbox",
        name: "hasProcessors",
        message: "Does this plugin contain one or more processors?"
    }];

    this.prompt(prompts, function (props) {
        this.pluginId = props.pluginId.replace("eslint-plugin-", "");
        this.hasRules = props.hasRules;
        this.hasProcessors = props.hasProcessors;
        this.desc = props.desc;
        this.userName = props.userName;
        this.year = (new Date()).getFullYear();

        cb();

    }.bind(this));


};

ESLintPluginGenerator.prototype.generate = function generate() {

    this.mkdir("lib");
    this.mkdir("tests");
    this.mkdir("tests/lib");
    this.template("_plugin.js", "lib/index.js");
    this.template("_package.json", "package.json");
    this.template("_README.md", "README.md");

    if (this.hasRules) {
        this.mkdir("lib/rules");
        this.mkdir("tests/lib/rules");
    }

    if (this.hasProcessors) {
        this.mkdir("lib/processors");
        this.mkdir("tests/lib/processors");
    }

};
