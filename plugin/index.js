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

const util = require("util");
const mkdirp = require("mkdirp");
const yeoman = require("yeoman-generator");

const validators = require("../lib/validators");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const isPluginId = validators.isPluginId;
const isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

const ESLintPluginGenerator = module.exports = function ESLintPluginGenerator() {
    yeoman.Base.apply(this, arguments); // eslint-disable-line prefer-rest-params
};

util.inherits(ESLintPluginGenerator, yeoman.Base);

ESLintPluginGenerator.prototype.askFor = function askFor() {
    const cb = this.async();

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

    this.prompt(prompts, props => {
        this.pluginId = props.pluginId.replace("eslint-plugin-", "");
        this.hasRules = props.hasRules;
        this.hasProcessors = props.hasProcessors;
        this.desc = props.desc;
        this.userName = props.userName;
        this.year = (new Date()).getFullYear();

        cb();

    });
};

ESLintPluginGenerator.prototype.generate = function generate() {
    mkdirp.sync("lib");
    mkdirp.sync("tests");
    mkdirp.sync("tests/lib");
    this.template("_.eslintrc.js", ".eslintrc.js");
    this.template("_plugin.js", "lib/index.js");
    this.template("_package.json", "package.json");
    this.template("_README.md", "README.md");

    if (this.hasRules) {
        mkdirp.sync("lib/rules");
        mkdirp.sync("tests/lib/rules");
    }

    if (this.hasProcessors) {
        mkdirp.sync("lib/processors");
        mkdirp.sync("tests/lib/processors");
    }
};
