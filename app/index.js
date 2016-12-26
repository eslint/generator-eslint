/**
 * @fileoverview Main generator (delegates to rule or plugin generator)
 * @author Kevin Partington
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var Generator = require("yeoman-generator");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var NAMESPACES = {
    Rule: "eslint:rule",
    Plugin: "eslint:plugin"
};

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = Generator.extend({
    prompting: function() {
        var done = this.async();

        this.prompt({
            type: "list",
            name: "outputType",
            message: "Do you want to generate a rule or a plugin?",
            choices: ["Rule", "Plugin"],
            default: "Rule"
        }).then(function(answers) {
            this.composeWith(NAMESPACES[answers.outputType]);
            done();
        }.bind(this));
    }
});
