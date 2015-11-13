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

var isPluginId = validators.isPluginId;
var isRequired = validators.isRequired;


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
