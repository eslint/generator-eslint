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

const yeoman = require("yeoman-generator");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const NAMESPACES = {
    Rule: "eslint:rule",
    Plugin: "eslint:plugin"
};

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------

module.exports = yeoman.Base.extend({
    prompting() {
        const done = this.async();

        this.prompt({
            type: "list",
            name: "outputType",
            message: "Do you want to generate a rule or a plugin?",
            choices: ["Rule", "Plugin"],
            default: "Rule"
        }, answers => {
            this.composeWith(NAMESPACES[answers.outputType]);
            done();
        });
    }
});
