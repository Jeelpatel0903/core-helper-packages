/**
 * @module function
 * @description Function utility helpers — debounce, throttle, memoize, curry, and more.
 */

'use strict';

/** Returns a debounced version of fn that delays invocation by wait ms. */
function debounce(fn, wait = 300) {
    let timer;
    function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    }
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
}

/** Returns a throttled version of fn that invokes at most once per wait ms. */
function throttle(fn, wait = 300) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last >= wait) { last = now; return fn.apply(this, args); }
    };
}

/** Ensures fn is called only once; subsequent calls return the first result. */
function once(fn) {
    let called = false, result;
    return function (...args) {
        if (!called) { called = true; result = fn.apply(this, args); }
        return result;
    };
}

/** Memoizes fn using a Map cache (supports custom key resolver). */
function memoize(fn, keyResolver) {
    const cache = new Map();
    return function (...args) {
        const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

/** Composes functions right-to-left: compose(f, g)(x) === f(g(x)). */
function compose(...fns) {
    return (x) => fns.reduceRight((v, f) => f(v), x);
}

/** Pipes functions left-to-right: pipe(f, g)(x) === g(f(x)). */
function pipe(...fns) {
    return (x) => fns.reduce((v, f) => f(v), x);
}

/** Curries a function (supports any arity). */
function curry(fn) {
    const arity = fn.length;
    return function curried(...args) {
        if (args.length >= arity) return fn(...args);
        return function (...more) { return curried(...args, ...more); };
    };
}

/** Creates a partial application of fn with provided args pre-filled. */
function partial(fn, ...preArgs) {
    return function (...args) { return fn(...preArgs, ...args); };
}

/** Flips the first two arguments of fn. */
function flip(fn) {
    return function (a, b, ...rest) { return fn(b, a, ...rest); };
}

/** Returns a negated (boolean-inverted) version of predicate. */
function negate(predicate) {
    return function (...args) { return !predicate.apply(this, args); };
}

/** Identity function — returns its argument. */
function identity(x) { return x; }

/** Always returns the same constant value. */
function constant(value) { return () => value; }

/** Does nothing (no-operation). */
function noop() {}

/** Calls fn after wait ms and returns a promise. */
function delay(fn, wait, ...args) {
    return new Promise(resolve => setTimeout(() => resolve(fn(...args)), wait));
}

/** Defers fn to next event-loop tick. */
function defer(fn, ...args) {
    return Promise.resolve().then(() => fn(...args));
}

/**
 * Retries fn up to maxAttempts times.
 * @param {Function} fn - Async function to retry.
 * @param {number} maxAttempts - Max number of attempts.
 * @param {number} delayMs - Delay between retries in ms.
 */
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

/** Rejects if fn doesn't resolve within timeoutMs. */
function timeout(fn, timeoutMs) {
    return Promise.race([
        Promise.resolve(fn()),
        new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${timeoutMs}ms`)), timeoutMs))
    ]);
}

/** Wraps fn in try-catch; returns [error, null] or [null, result]. */
function tryCatch(fn, ...args) {
    try { return [null, fn(...args)]; }
    catch (err) { return [err, null]; }
}

/** Async version of tryCatch. */
async function tryCatchAsync(fn, ...args) {
    try { return [null, await fn(...args)]; }
    catch (err) { return [err, null]; }
}

/** Converts a callback-style function (last arg = callback(err, result)) to a Promise. */
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => { if (err) reject(err); else resolve(result); });
        });
    };
}

/** Runs fn and logs the elapsed time. Returns result. */
function timed(fn, label = 'fn') {
    return function (...args) {
        const start = Date.now();
        const result = fn.apply(this, args);
        if (result && typeof result.then === 'function') {
            return result.then(v => { console.log(`[timed] ${label}: ${Date.now() - start}ms`); return v; });
        }
        console.log(`[timed] ${label}: ${Date.now() - start}ms`);
        return result;
    };
}

/** Calls fn with value and returns value unchanged (useful in pipelines). */
function tap(fn) {
    return function (value) { fn(value); return value; };
}

/** Limits function to only accept n arguments. */
function ary(fn, n) { return function (...args) { return fn(...args.slice(0, n)); }; }

/** Limits function to only accept 1 argument. */
function unary(fn) { return ary(fn, 1); }

/** Limits function to only accept 2 arguments. */
function binary(fn) { return ary(fn, 2); }

/** Calls fn n times, collecting results. */
function times(n, fn) { return Array.from({ length: n }, (_, i) => fn(i)); }

/** Memoizes an async function. */
function memoizeAsync(fn, keyResolver) {
    const cache = new Map();
    return async function (...args) {
        const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = await fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

/** Returns a function that logs its arguments and result on each call. */
function trace(fn, label = fn.name) {
    return function (...args) {
        console.log(`[trace] ${label} called with:`, args);
        const result = fn.apply(this, args);
        console.log(`[trace] ${label} returned:`, result);
        return result;
    };
}

/** Sleeps for ms milliseconds (returns a promise). */
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

module.exports = {
    debounce, throttle, once, memoize, compose, pipe, curry, partial,
    flip, negate, identity, constant, noop, delay, defer,
    retry, timeout, tryCatch, tryCatchAsync, promisify,
    timed, tap, ary, unary, binary, times, memoizeAsync, trace, sleep
};
