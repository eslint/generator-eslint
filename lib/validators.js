/**
 * @fileoverview Validation helpers
 */

"use strict";

/**
 * Determines if a given pluginId is valid. This is used by the prompt system.
 * @param {string} pluginId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 * @private
 */
function isPluginId(pluginId) {
    if (/^(?:[a-z]+(?:\-[a-z]+)*)$/.test(pluginId)) {
        return true;
    } else {
        return "Rule ID must be all lowercase with dashes as separators.";
    }
}
exports.isPluginId = isPluginId;

/**
 * Determines if a given ruleId is valid. This is used by the prompt system.
 * @param {string} ruleId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 * @private
 */
function isRuleId(ruleId) {
    if (/^(?:[a-z]+(?:\-[a-z]+)*)$/.test(ruleId)) {
        return true;
    } else {
        return "Rule ID must be all lowercase with dashes as separators.";
    }
}
exports.isRuleId = isRuleId;
/**
 * Validates that a value has been provided. This is used for validating
 * user input using prompts.
 * @param {string} value The inputted value.
 * @returns {string|boolean} A string if the value is an empty string, true
 *      if the value is not an empty string.
 * @private
 */
function isRequired(value) {
    if (value === "") {
        return "Please provide a value";
    } else {
        return true;
    }
}
exports.isRequired = isRequired;
