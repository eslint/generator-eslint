/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

import assert from "node:assert"; // eslint-disable-line node/no-missing-import -- https://github.com/mysticatea/eslint-plugin-node/issues/275

const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`); // eslint-disable-line func-style, node/no-unsupported-features/es-syntax -- https://github.com/mysticatea/eslint-plugin-node/issues/250

describe("eslint generator", () => {
    it("can be imported without blowing up", () => {
        const app = importFresh("../rule");

        assert.ok(app);
    });
});
