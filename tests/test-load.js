/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

import assert from "node:assert";

const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`);

describe("eslint generator", () => {
    it("can be imported without blowing up", () => {
        const app = importFresh("../rule");

        assert.ok(app);
    });
});
