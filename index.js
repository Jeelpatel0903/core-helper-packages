/**
 * core-helper-packages v2.0.0
 *
 * A comprehensive all-in-one JavaScript utility library with 500+ functions.
 * Works in Node.js, browsers, Angular, React, Vue, and TypeScript projects.
 *
 * Modules:
 *   - type       : 40+ type-checking utilities
 *   - array      : 80+ array utilities
 *   - string     : 80+ string utilities
 *   - number     : 65+ number/math utilities
 *   - object     : 65+ object utilities
 *   - date       : 75+ date/time utilities
 *   - validation : 55+ validation functions
 *   - function   : 30+ function helpers (debounce, memoize, curry…)
 *   - color      : 30+ color utilities
 *   - async      : 25+ async/promise utilities
 *   - dom        : 30+ DOM/browser utilities (browser-only, safely guarded)
 *
 * @author Jeel Patel
 * @license ISC
 * @see https://github.com/Jeelpatel0903/core-helper-packages
 */

'use strict';

const type       = require('./src/type');
const array      = require('./src/array');
const string     = require('./src/string');
const number     = require('./src/number');
const object     = require('./src/object');
const date       = require('./src/date');
const validation = require('./src/validation');
const func       = require('./src/function');
const color      = require('./src/color');
const async_     = require('./src/async');
const dom        = require('./src/dom');

// ─── Re-export all modules ────────────────────────────────────────────────────

module.exports = {
    // Namespaced exports (recommended for larger apps)
    type,
    array,
    string,
    number,
    object,
    date,
    validation,
    function: func,
    color,
    async: async_,
    dom,

    // ── Type Utilities ──
    ...type,

    // ── Array Utilities ──
    ...array,

    // ── String Utilities ──
    ...string,

    // ── Number Utilities ──
    ...number,

    // ── Object Utilities ──
    ...object,

    // ── Date Utilities ──
    ...date,

    // ── Validation ──
    ...validation,

    // ── Function Utilities ──
    // (sleep is re-exported from both async and function — use async.sleep)
    debounce:       func.debounce,
    throttle:       func.throttle,
    once:           func.once,
    memoize:        func.memoize,
    compose:        func.compose,
    pipe:           func.pipe,
    curry:          func.curry,
    partial:        func.partial,
    flip:           func.flip,
    negate:         func.negate,
    identity:       func.identity,
    constant:       func.constant,
    noop:           func.noop,
    delay:          func.delay,
    defer:          func.defer,
    tryCatch:       func.tryCatch,
    tryCatchAsync:  func.tryCatchAsync,
    promisify:      func.promisify,
    timed:          func.timed,
    tap:            func.tap,
    ary:            func.ary,
    unary:          func.unary,
    binary:         func.binary,
    times:          func.times,
    memoizeAsync:   func.memoizeAsync,
    trace:          func.trace,

    // ── Color Utilities ──
    ...color,

    // ── Async Utilities ──
    sleep:              async_.sleep,
    retry:              async_.retry,
    withTimeout:        async_.withTimeout,
    parallel:           async_.parallel,
    sequential:         async_.sequential,
    waterfall:          async_.waterfall,
    mapWithConcurrency: async_.mapWithConcurrency,
    allSettled:         async_.allSettled,
    any:                async_.any,
    race:               async_.race,
    asyncMap:           async_.asyncMap,
    asyncFilter:        async_.asyncFilter,
    asyncReduce:        async_.asyncReduce,
    asyncForEach:       async_.asyncForEach,
    whilst:             async_.whilst,
    until:              async_.until,
    timesAsync:         async_.timesAsync,
    deferred:           async_.deferred,
    createQueue:        async_.createQueue,
    cancellable:        async_.cancellable,
    settle:             async_.settle,

    // ── DOM Utilities ──
    ...dom,
};
