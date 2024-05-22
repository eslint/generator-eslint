/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

import assert from "node:assert";

/**
 * Import a module fresh every time.
 * @param {string} modulePath The path to the module to import.
 * @returns {Promise<*>} The imported module.
 */
async function importFresh(modulePath) {
    return import(`${modulePath}?x=${new Date()}`);
}

describe("eslint generator", () => {
    it("can be imported without blowing up", () => {
        const app = importFresh("../rule");

        assert.ok(app);
    });
});
