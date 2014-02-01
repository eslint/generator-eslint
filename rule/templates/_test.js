/**
 * @fileoverview <%= desc %>
 * @author <%= userName %>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

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
