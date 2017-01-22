/**
 * @fileoverview <%= desc %>
 * @author <%= userName %>
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
var rulesDir = require("path").join(__dirname, "/rules");

module.exports.rules = requireIndex(rulesDir);
<% } %>

<% if (hasProcessors) { %>
// import processors
module.exports.processors = {

    // add your processors here
};
<% } %>
