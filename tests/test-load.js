/**
 * @fileoverview Rule generator tests
 * @author Nicholas C. Zakas
 */

// eslint-disable-next-line node/no-missing-import -- https://github.com/mysticatea/eslint-plugin-node/issues/275
import assert from "node:assert";

// eslint-disable-next-line func-style, node/no-unsupported-features/es-syntax -- https://github.com/mysticatea/eslint-plugin-node/issues/250
const importFresh = async modulePath => import(`${modulePath}?x=${new Date()}`);

describe("eslint generator", () => {
    it("can be imported without blowing up", () => {
        const app = importFresh("../rule");

        assert.ok(app);
    });
});
