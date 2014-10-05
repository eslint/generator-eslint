/**
 * @fileoverview <%= desc %>
 * @author <%= userName %>
 * @copyright 2014 <%= userName %>. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/<%= ruleId %>", {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "<%= invalidCode %>",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
