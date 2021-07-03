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
const yeoman = require("yeoman-generator");
const { mkdirSync } = require("fs");

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
    mkdirSync("lib", { recursive: true });
    mkdirSync("tests", { recursive: true });
    mkdirSync("tests/lib", { recursive: true });
    this.template("_.eslintrc.js", ".eslintrc.js");
    this.template("_plugin.js", "lib/index.js");
    this.template("_package.json", "package.json");
    this.template("_README.md", "README.md");

    if (this.hasRules) {
        mkdirSync("lib/rules", { recursive: true });
        mkdirSync("tests/lib/rules", { recursive: true });
    }

    if (this.hasProcessors) {
        mkdirSync("lib/processors", { recursive: true });
        mkdirSync("tests/lib/processors", { recursive: true });
    }
};
