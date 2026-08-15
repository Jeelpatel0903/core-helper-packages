/**
 * @module async
 * @description Async/Promise utility functions — 25+ helpers.
 */

'use strict';

/** Sleeps for ms milliseconds. */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

/** Runs async fn, retrying up to maxAttempts times with optional delay. */
async function retry(fn, maxAttempts = 3, delayMs = 0) {
    let lastError;
    for (let i = 0; i < maxAttempts; i++) {
        try { return await fn(); }
        catch (err) {
            lastError = err;
            if (i < maxAttempts - 1 && delayMs > 0) await sleep(delayMs);
        }
    }
    throw lastError;
}

/** Rejects promise if fn doesn't resolve within ms. */
function withTimeout(fn, ms) {
    return Promise.race([
        typeof fn === 'function' ? fn() : fn,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))
    ]);
}

/** Runs all promises in parallel, returns all results. */
function parallel(tasks) {
    return Promise.all(tasks.map(t => (typeof t === 'function' ? t() : t)));
}

/** Runs promise tasks sequentially, collecting results in order. */
async function sequential(tasks) {
    const results = [];
    for (const task of tasks) results.push(await (typeof task === 'function' ? task() : task));
    return results;
}

/** Runs async fns in series (left-to-right), passing result to next. */
async function waterfall(fns, initial) {
    let value = initial;
    for (const fn of fns) value = await fn(value);
    return value;
}

/** Like Promise.all, but with concurrency limit. */
async function mapWithConcurrency(items, fn, concurrency = 5) {
    const results = new Array(items.length);
    let index = 0;
    async function worker() {
        while (index < items.length) {
            const i = index++;
            results[i] = await fn(items[i], i);
        }
    }
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
    return results;
}

/** Like Promise.allSettled — returns array of {status, value/reason}. */
function allSettled(promises) { return Promise.allSettled(promises); }

/** Resolves with first fulfilled promise; rejects if all fail. */
function any(promises) {
    if (typeof Promise.any !== 'undefined') return Promise.any(promises);
    return new Promise((resolve, reject) => {
        let rejections = 0;
        const errors = [];
        promises.forEach((p, i) => {
            Promise.resolve(p).then(resolve).catch(err => {
                errors[i] = err;
                if (++rejections === promises.length) reject(new AggregateError(errors, 'All promises rejected'));
            });
        });
    });
}

/** Resolves with first settled promise (resolved or rejected). */
function race(promises) { return Promise.race(promises); }

/** Async map over array with optional concurrency. */
async function asyncMap(arr, fn, concurrency = Infinity) {
    if (concurrency === Infinity) return Promise.all(arr.map(fn));
    return mapWithConcurrency(arr, fn, concurrency);
}

/** Async filter over array. */
async function asyncFilter(arr, predicate) {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_, i) => results[i]);
}

/** Async reduce over array. */
async function asyncReduce(arr, fn, init) {
    let acc = init;
    for (const item of arr) acc = await fn(acc, item);
    return acc;
}

/** Async forEach over array. */
async function asyncForEach(arr, fn) {
    for (const item of arr) await fn(item);
}

/** Runs fn whilst predicate returns true. */
async function whilst(predicate, fn) {
    while (await predicate()) await fn();
}

/** Runs fn until predicate returns true. */
async function until(predicate, fn) {
    do { await fn(); } while (!(await predicate()));
}

/** Runs fn n times asynchronously. */
async function timesAsync(n, fn) {
    return asyncMap(Array.from({ length: n }, (_, i) => i), fn);
}

/** Creates a deferred promise with external resolve/reject. */
function deferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
}

/** Creates a simple async queue with concurrency control. */
function createQueue(concurrency = 1) {
    let running = 0;
    const queue = [];
    function next() {
        while (running < concurrency && queue.length) {
            running++;
            const { task, resolve, reject } = queue.shift();
            Promise.resolve(task()).then(resolve, reject).finally(() => { running--; next(); });
        }
    }
    return {
        add(task) { return new Promise((resolve, reject) => { queue.push({ task, resolve, reject }); next(); }); },
        get size() { return queue.length; },
        get running() { return running; }
    };
}

/** Wraps a promise to make it cancellable (uses AbortController pattern). */
function cancellable(promiseFn) {
    let cancelled = false;
    const promise = new Promise(async (resolve, reject) => {
        try {
            const result = await promiseFn();
            if (!cancelled) resolve(result);
        } catch (err) {
            if (!cancelled) reject(err);
        }
    });
    return { promise, cancel: () => { cancelled = true; } };
}

/** Runs async fn and returns {result, duration} with elapsed time. */
async function timed(fn) {
    const start = Date.now();
    const result = await fn();
    return { result, duration: Date.now() - start };
}

/** Resolves promise after all have settled (alias for allSettled). */
function settle(promises) { return Promise.allSettled(promises); }

module.exports = {
    sleep, retry, withTimeout, parallel, sequential, waterfall,
    mapWithConcurrency, allSettled, any, race,
    asyncMap, asyncFilter, asyncReduce, asyncForEach,
    whilst, until, timesAsync, deferred, createQueue,
    cancellable, timed, settle
};
