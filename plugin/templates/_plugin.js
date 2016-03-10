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

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

<% if (hasRules) { %>
// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");
<% } %>

<% if (hasProcessors) { %>
// import processors
module.exports.processors = {

    // add your processors here
};
<% } %>
