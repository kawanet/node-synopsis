#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";

import {queueFactory, clearCache} from "async-cache-queue";
import {AxiosInstance} from "axios";

const TITLE = __filename.split("/").pop();

/**
 * https://github.com/kawanet/async-cache-queue
 */

describe(TITLE, () => {
    it("SYNOPSIS", async function () {
        this.timeout(5000);

        // const {queueFactory, clearCache} = require("async-cache-queue");
        const axios: AxiosInstance = require("axios");

        const memoize = queueFactory({
            cache: 3600000, // 1 hour for results resolved
            refresh: 60000, // 1 min for pre-fetching next
            negativeCache: 1000, // 1 sec for errors rejected
            timeout: 10000, // 10 sec for force cancelation
            maxItems: 1000, // 1000 items in memory cache
            concurrency: 10, // 10 process throttled
        });

        let count = 0;
        const cacheGET = memoize((url: string) => {
            count++;
            return axios.get(url);
        });

        async function loadAPI() {
            const {data} = await cacheGET("https://www3.nhk.or.jp/news/json16/newsup.json");
            return data;
        }

        // clear all caches when kill -HUP signal received.
        process.on("SIGHUP", clearCache);

        assert.ok((await loadAPI()).channel.item.length);
        assert.ok((await loadAPI()).channel.item.length);
        assert.ok((await loadAPI()).channel.item.length);
        assert.ok((await loadAPI()).channel.item.length);
        assert.equal(count, 1);

        clearCache();
    });
});