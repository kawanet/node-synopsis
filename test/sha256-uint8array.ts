#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";

import {createHash} from "sha256-uint8array";

const TITLE = __filename.split("/").pop();

/**
 * https://github.com/kawanet/sha256-uint8array
 */

describe(TITLE, () => {
    it("SYNOPSIS", () => {

        // const createHash = require("sha256-uint8array").createHash;

        const text = "";
        const hex = createHash().update(text).digest("hex");
        assert.equal(hex, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

        const data = new Uint8Array(0);
        const hash = createHash().update(data).digest();
        assert.equal(hash.length, 32);
        assert.equal(hash instanceof Uint8Array, true);
        const array = Array.from(hash);
        assert.equal(array.length, 32);
        assert.deepEqual(array, Array.from(Buffer.from("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "hex")));

    });
});