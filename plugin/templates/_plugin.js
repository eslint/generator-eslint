/**
 * @fileoverview <%= desc %>
 * @author <%= userName %>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

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
