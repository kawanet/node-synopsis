#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";

import {createHash} from "sha1-uint8array";

const TITLE = __filename.split("/").pop();

/**
 * https://github.com/kawanet/sha1-uint8array
 */

describe(TITLE, () => {
    it("SYNOPSIS", () => {

        // const createHash = require("sha1-uint8array").createHash;

        const text = "";
        const hex = createHash().update(text).digest("hex");
        assert.equal(hex, "da39a3ee5e6b4b0d3255bfef95601890afd80709");

        const data = new Uint8Array(0);
        const hash = createHash().update(data).digest();
        assert.equal(hash.length, 20);
        assert.equal(hash instanceof Uint8Array, true);
        const array = Array.from(hash);
        assert.equal(array.length, 20);
        assert.deepEqual(array, Array.from(Buffer.from("da39a3ee5e6b4b0d3255bfef95601890afd80709", "hex")));

    });
});