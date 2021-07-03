/**
 * @fileoverview Main generator tests
 * @author Kevin Partington
 */
/* eslint no-invalid-this:0 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const assert = require("yeoman-assert"),
    generators = require("yeoman-generator"),
    helpers = require("yeoman-test"),
    path = require("path"),
    sinon = require("sinon");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe("ESLint Main Generator", () => {
    const sandbox = sinon.createSandbox();

    before(function(done) {
        this.spy = sandbox.spy();

        this.dummyGenerator = generators.Base.extend({
            exec: this.spy
        });

        helpers.testDirectory(path.join(__dirname, "../../temp"), done);
    });

    beforeEach(function() {
        this.spy.resetHistory();
    });

    describe("User answers with Plugin", () => {
        beforeEach(function(done) {

            /*
             * Adapted from:
             * http://stackoverflow.com/questions/27643601/testing-yeomans-composewith
             * Adapted to use createGenerator and the .run() method on generator
             * instances. The idea is that the dummyGenerator is being assigned
             * the namespace "eslint:plugin" for this test, so when the main
             * generator invokes "eslint:plugin", it will run our
             * dummyGenerator's exec() function and thus call our spy.
             */

            this.eslintGenerator = helpers.createGenerator("eslint", [
                "../app",
                [this.dummyGenerator, "eslint:plugin"]
            ]);

            helpers.mockPrompt(this.eslintGenerator, {
                outputType: "Plugin"
            });

            this.eslintGenerator.options["skip-install"] = true;

            this.eslintGenerator.run(done);
        });

        it("should run the eslint:plugin generator", function() {
            assert.ok(this.spy.calledOnce);
        });
    });

    describe("User answers with Rule", () => {
        beforeEach(function(done) {

            /*
             * Adapted from:
             * http://stackoverflow.com/questions/27643601/testing-yeomans-composewith
             * Adapted to use createGenerator and the .run() method on generator
             * instances. The idea is that the dummyGenerator is being assigned
             * the namespace "eslint:rule" for this test, so when the main
             * generator invokes "eslint:rule", it will run our dummyGenerator's
             * exec() function and thus call our spy.
             */

            this.eslintGenerator = helpers.createGenerator("eslint", [
                "../app",
                [this.dummyGenerator, "eslint:rule"]
            ]);

            helpers.mockPrompt(this.eslintGenerator, {
                outputType: "Rule"
            });

            this.eslintGenerator.options["skip-install"] = true;

            this.eslintGenerator.run(done);
        });

        it("should run the eslint:rule generator", function() {
            assert.ok(this.spy.calledOnce);
        });
    });
});
