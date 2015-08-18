/**
 * @fileoverview <%= desc %>
 * @author <%= userName %>
 * @copyright <%= year%> <%= userName %>. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/<%= ruleId %>"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("<%= ruleId %>", rule, {

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
