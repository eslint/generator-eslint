/**
 * @fileoverview Plugin generator
 * @author Nicholas C. Zakas
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("util");
var mkdirp = require("mkdirp");
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

var ESLintPluginGenerator = module.exports = function ESLintPluginGenerator() {
    yeoman.Base.apply(this, arguments);

    this.on("end", function() {
        if (this.selfLinting) {
            this.spawnCommand("eslint", ["--init"]);
        }
    }.bind(this));
};

util.inherits(ESLintPluginGenerator, yeoman.Base);

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
    }, {
        type: "confirm",
        name: "selfLinting",
        message: "Do you want to setup linting for this plugin?",
        default: true
    }];

    this.prompt(prompts, function(props) {
        this.pluginId = props.pluginId.replace("eslint-plugin-", "");
        this.hasRules = props.hasRules;
        this.hasProcessors = props.hasProcessors;
        this.desc = props.desc;
        this.userName = props.userName;
        this.year = (new Date()).getFullYear();
        this.selfLinting = props.selfLinting;

        cb();

    }.bind(this));
};

ESLintPluginGenerator.prototype.generate = function generate() {
    mkdirp.sync("lib");
    mkdirp.sync("tests");
    mkdirp.sync("tests/lib");
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
