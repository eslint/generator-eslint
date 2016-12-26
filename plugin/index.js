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

var mkdirp = require("mkdirp");
var Generator = require("yeoman-generator");

var validators = require("../lib/validators");
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var isPluginId = validators.isPluginId;
var isRequired = validators.isRequired;

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = Generator.extend({
    prompting: function() {
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

        return this.prompt(prompts).then(function(props) {
            this.pluginId = props.pluginId.replace("eslint-plugin-", "");
            this.hasRules = props.hasRules;
            this.hasProcessors = props.hasProcessors;
            this.desc = props.desc;
            this.userName = props.userName;
            this.year = (new Date()).getFullYear();
        }.bind(this));
    },

    writing: function() {
        mkdirp.sync("lib");
        mkdirp.sync("tests");
        mkdirp.sync("tests/lib");
        this.fs.copyTpl(
            this.templatePath("_plugin.js"),
            this.destinationPath("lib/index.js"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("_README.md"),
            this.destinationPath("README.md"),
            this
        );

        if (this.hasRules) {
            mkdirp.sync("lib/rules");
            mkdirp.sync("tests/lib/rules");
        }

        if (this.hasProcessors) {
            mkdirp.sync("lib/processors");
            mkdirp.sync("tests/lib/processors");
        }
    }
});
