/**
 * @fileoverview Validation helpers
 * @author Nicholas C. Zakas
 */
"use strict";

/**
 * Regex for valid IDs
 * @type {RegExp}
 */
const rValidId = /^(?:[a-z0-9]+(?:-[a-z0-9]+)*)$/u;

/**
 * Determines if a given pluginId is valid. This is used by the prompt system.
 * @param {string} pluginId The plugin ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 */
function isPluginId(pluginId) {
    if (rValidId.test(pluginId)) {
        return true;
    }
    return "Plugin ID must be all lowercase with dashes as separators.";
}
exports.isPluginId = isPluginId;

/**
 * Determines if a given ruleId is valid. This is used by the prompt system.
 * @param {string} ruleId The rule ID to check.
 * @returns {boolean|string} True if valid, a string with an error message if not.
 */
function isRuleId(ruleId) {
    if (rValidId.test(ruleId)) {
        return true;
    }
    return "Rule ID must be all lowercase with dashes as separators.";
}
exports.isRuleId = isRuleId;

/**
 * Validates that a value has been provided. This is used for validating
 * user input using prompts.
 * @param {string} value The inputted value.
 * @returns {string|boolean} A string if the value is an empty string, true
 *      if the value is not an empty string.
 */
function isRequired(value) {
    if (value === "") {
        return "Please provide a value";
    }
    return true;
}
exports.isRequired = isRequired;
