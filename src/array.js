/**
 * @module array
 * @description Comprehensive array utility functions — 80+ helpers.
 */

'use strict';

function _assertArray(val, name) {
    if (!Array.isArray(val)) throw new TypeError(`${name || 'Argument'} must be an array`);
}
function _assertFn(val, name) {
    if (typeof val !== 'function') throw new TypeError(`${name || 'Argument'} must be a function`);
}

// ─── Basic ───────────────────────────────────────────────────────────────────

/** Checks if value is an array. */
function isArray(value) { return Array.isArray(value); }

/** Checks if array is empty. */
function isArrayEmpty(arr) { _assertArray(arr, 'arr'); return arr.length === 0; }

/** Gets length of array. */
function getArrayLength(arr) { _assertArray(arr, 'arr'); return arr.length; }

/** Gets first element. */
function firstElement(arr) { _assertArray(arr, 'arr'); return arr[0]; }

/** Gets last element. */
function lastElement(arr) { _assertArray(arr, 'arr'); return arr[arr.length - 1]; }

/** Gets the nth element (supports negative indices). */
function nthElement(arr, n) {
    _assertArray(arr, 'arr');
    return n >= 0 ? arr[n] : arr[arr.length + n];
}

/** Adds element to end, returns new array. */
function pushElement(arr, element) { _assertArray(arr, 'arr'); return [...arr, element]; }

/** Removes last element, returns new array. */
function popElement(arr) { _assertArray(arr, 'arr'); return arr.slice(0, -1); }

/** Adds element to start, returns new array. */
function unshiftElement(arr, element) { _assertArray(arr, 'arr'); return [element, ...arr]; }

/** Removes first element, returns new array. */
function shiftElement(arr) { _assertArray(arr, 'arr'); return arr.slice(1); }

// ─── Search & Access ─────────────────────────────────────────────────────────

/** Finds index of element. */
function indexOfElement(arr, element) { _assertArray(arr, 'arr'); return arr.indexOf(element); }

/** Checks if array contains element. */
function includesElement(arr, element) { _assertArray(arr, 'arr'); return arr.includes(element); }

/** Finds first element matching predicate. */
function findElement(arr, predicate) { _assertArray(arr, 'arr'); _assertFn(predicate, 'predicate'); return arr.find(predicate); }

/** Finds index of first element matching predicate. */
function findIndexElement(arr, predicate) { _assertArray(arr, 'arr'); _assertFn(predicate, 'predicate'); return arr.findIndex(predicate); }

/** Gets element at index, returns before array slice. */
function beforeArray(arr, index) { _assertArray(arr, 'arr'); return arr.slice(0, index); }

/** Gets elements after index. */
function afterArray(arr, index) {
    _assertArray(arr, 'arr');
    if (index < 0 || index >= arr.length - 1) return [];
    return arr.slice(index + 1);
}

// ─── Math ────────────────────────────────────────────────────────────────────

/** Sum of numeric array. */
function sumArray(arr) {
    _assertArray(arr, 'arr');
    return arr.reduce((s, v) => { if (typeof v !== 'number') throw new TypeError('Non-numeric value'); return s + v; }, 0);
}

/** Average of numeric array. */
function averageArray(arr) {
    _assertArray(arr, 'arr');
    if (arr.length === 0) return NaN;
    return sumArray(arr) / arr.length;
}

/** Maximum of numeric array. */
function maxArray(arr) { _assertArray(arr, 'arr'); if (!arr.length) throw new TypeError('Empty array'); return Math.max(...arr); }

/** Minimum of numeric array. */
function minArray(arr) { _assertArray(arr, 'arr'); if (!arr.length) throw new TypeError('Empty array'); return Math.min(...arr); }

/** Median of numeric array. */
function median(arr) {
    _assertArray(arr, 'arr');
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Mode(s) of array (most frequent values). */
function mode(arr) {
    _assertArray(arr, 'arr');
    const freq = {};
    arr.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const max = Math.max(...Object.values(freq));
    return Object.keys(freq).filter(k => freq[k] === max).map(k => isNaN(k) ? k : Number(k));
}

/** Variance of numeric array. */
function variance(arr) {
    _assertArray(arr, 'arr');
    const avg = averageArray(arr);
    return averageArray(arr.map(v => (v - avg) ** 2));
}

/** Standard deviation of numeric array. */
function standardDeviation(arr) { return Math.sqrt(variance(arr)); }

/** Percentile value of numeric array. */
function percentile(arr, p) {
    _assertArray(arr, 'arr');
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx), upper = Math.ceil(idx);
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}

/** Cumulative sum array. */
function cumSum(arr) {
    _assertArray(arr, 'arr');
    let s = 0;
    return arr.map(v => (s += v));
}

/** Cumulative product array. */
function cumProduct(arr) {
    _assertArray(arr, 'arr');
    let p = 1;
    return arr.map(v => (p *= v));
}

/** Moving average with window size. */
function movingAverage(arr, window) {
    _assertArray(arr, 'arr');
    return arr.map((_, i) => {
        const slice = arr.slice(Math.max(0, i - window + 1), i + 1);
        return slice.reduce((a, b) => a + b, 0) / slice.length;
    });
}

// ─── Transformation ──────────────────────────────────────────────────────────

/** Maps over array. */
function mapArray(arr, cb) { _assertArray(arr, 'arr'); _assertFn(cb, 'cb'); return arr.map(cb); }

/** Filters array. */
function filterArray(arr, pred) { _assertArray(arr, 'arr'); _assertFn(pred, 'pred'); return arr.filter(pred); }

/** Reduces array. */
function reduceArray(arr, cb, init) { _assertArray(arr, 'arr'); _assertFn(cb, 'cb'); return arr.reduce(cb, init); }

/** Flattens nested array to single level. */
function flatArray(arr) { _assertArray(arr, 'arr'); return arr.flat(Infinity); }

/** Flattens one level deep. */
function flatOnce(arr) { _assertArray(arr, 'arr'); return arr.flat(1); }

/** Flattens to specified depth. */
function flatDepth(arr, depth) { _assertArray(arr, 'arr'); return arr.flat(depth); }

/** FlatMap shorthand. */
function flatMapArray(arr, cb) { _assertArray(arr, 'arr'); _assertFn(cb, 'cb'); return arr.flatMap(cb); }

/** Removes duplicate values. */
function uniqueArray(arr) { _assertArray(arr, 'arr'); return [...new Set(arr)]; }

/** Unique by key function. */
function uniqueBy(arr, keyFn) {
    _assertArray(arr, 'arr'); _assertFn(keyFn, 'keyFn');
    const seen = new Set();
    return arr.filter(item => { const k = keyFn(item); if (seen.has(k)) return false; seen.add(k); return true; });
}

/** Sorts array (returns new array). */
function sortArray(arr, compareFn) {
    _assertArray(arr, 'arr');
    return [...arr].sort(compareFn);
}

/** Sorts array of objects by key. */
function sortBy(arr, key, order = 'asc') {
    _assertArray(arr, 'arr');
    return [...arr].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

/** Reverses array (returns new array). */
function reverseArray(arr) { _assertArray(arr, 'arr'); return [...arr].reverse(); }

/** Removes falsy values. */
function compactArray(arr) {
    _assertArray(arr, 'arr');
    return arr.filter(x => x !== null && x !== undefined && x !== 0 && x !== false && x !== '' && !Number.isNaN(x));
}

/** Removes nullish values only (null/undefined). */
function compactNullish(arr) {
    _assertArray(arr, 'arr');
    return arr.filter(x => x !== null && x !== undefined);
}

/** Splits array into chunks of size n. */
function chunkArray(arr, size) {
    _assertArray(arr, 'arr');
    if (size <= 0) throw new RangeError('Chunk size must be > 0');
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
}

/** Drops first n elements. */
function dropArray(arr, n = 1) { _assertArray(arr, 'arr'); return arr.slice(n); }

/** Drops last n elements. */
function dropRight(arr, n = 1) { _assertArray(arr, 'arr'); return arr.slice(0, arr.length - n); }

/** Takes first n elements. */
function takeArray(arr, n = 1) { _assertArray(arr, 'arr'); return arr.slice(0, n); }

/** Takes last n elements. */
function takeRight(arr, n = 1) { _assertArray(arr, 'arr'); return arr.slice(arr.length - n); }

/** Drops elements while predicate is true. */
function dropWhile(arr, pred) {
    _assertArray(arr, 'arr'); _assertFn(pred, 'pred');
    let i = 0;
    while (i < arr.length && pred(arr[i])) i++;
    return arr.slice(i);
}

/** Takes elements while predicate is true. */
function takeWhile(arr, pred) {
    _assertArray(arr, 'arr'); _assertFn(pred, 'pred');
    let i = 0;
    while (i < arr.length && pred(arr[i])) i++;
    return arr.slice(0, i);
}

/** Rotates array by n positions. */
function rotate(arr, n = 1) {
    _assertArray(arr, 'arr');
    const len = arr.length;
    if (!len) return [];
    const shift = ((n % len) + len) % len;
    return [...arr.slice(shift), ...arr.slice(0, shift)];
}

/** Fills array with value. */
function fillArray(arr, value, start, end) {
    _assertArray(arr, 'arr');
    return [...arr].fill(value, start, end);
}

/** Creates range array [start..end) with optional step. */
function range(start, end, step = 1) {
    const result = [];
    if (step === 0) throw new RangeError('Step cannot be 0');
    for (let i = start; step > 0 ? i < end : i > end; i += step) result.push(i);
    return result;
}

/** Creates range [0..n). */
function rangeOf(n) { return Array.from({ length: n }, (_, i) => i); }

// ─── Set Operations ──────────────────────────────────────────────────────────

/** Intersection of two arrays. */
function intersectArray(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    const set = new Set(arr2);
    return arr1.filter(v => set.has(v));
}

/** Union of two arrays. */
function unionArray(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    return [...new Set([...arr1, ...arr2])];
}

/** Difference: elements in arr1 not in arr2. */
function differenceArray(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    const set = new Set(arr2);
    return arr1.filter(v => !set.has(v));
}

/** Symmetric difference: elements in either but not both. */
function symmetricDifference(arr1, arr2) {
    return [...differenceArray(arr1, arr2), ...differenceArray(arr2, arr1)];
}

/** Checks if arr1 is a subset of arr2. */
function isSubset(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    const set = new Set(arr2);
    return arr1.every(v => set.has(v));
}

/** Checks if two arrays have same elements (order-independent). */
function arrayEquals(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    if (arr1.length !== arr2.length) return false;
    const s1 = [...arr1].sort(), s2 = [...arr2].sort();
    return s1.every((v, i) => v === s2[i]);
}

// ─── Grouping & Counting ─────────────────────────────────────────────────────

/** Groups array elements by key function. */
function groupBy(arr, keyFn) {
    _assertArray(arr, 'arr'); _assertFn(keyFn, 'keyFn');
    return arr.reduce((acc, item) => {
        const k = keyFn(item);
        if (!acc[k]) acc[k] = [];
        acc[k].push(item);
        return acc;
    }, {});
}

/** Partitions array into [truthy, falsy]. */
function partition(arr, pred) {
    _assertArray(arr, 'arr'); _assertFn(pred, 'pred');
    return arr.reduce(([pass, fail], item) => pred(item) ? [[...pass, item], fail] : [pass, [...fail, item]], [[], []]);
}

/** Counts occurrences of each value. */
function countBy(arr, keyFn) {
    _assertArray(arr, 'arr'); _assertFn(keyFn, 'keyFn');
    return arr.reduce((acc, item) => { const k = keyFn(item); acc[k] = (acc[k] || 0) + 1; return acc; }, {});
}

/** Creates object indexed by key function. */
function indexBy(arr, keyFn) {
    _assertArray(arr, 'arr'); _assertFn(keyFn, 'keyFn');
    return arr.reduce((acc, item) => { acc[keyFn(item)] = item; return acc; }, {});
}

/** Plucks property from each object in array. */
function pluck(arr, key) { _assertArray(arr, 'arr'); return arr.map(item => item[key]); }

/** Tallies (counts) raw values without a keyFn. */
function tally(arr) {
    _assertArray(arr, 'arr');
    return arr.reduce((acc, v) => { acc[v] = (acc[v] || 0) + 1; return acc; }, {});
}

/** Returns frequency map (same as tally but typed). */
function frequencies(arr) { return tally(arr); }

// ─── Zip & Pair ──────────────────────────────────────────────────────────────

/** Zips two or more arrays together. */
function zipArray(...arrays) {
    arrays.forEach((a, i) => _assertArray(a, `arrays[${i}]`));
    const len = Math.min(...arrays.map(a => a.length));
    return Array.from({ length: len }, (_, i) => arrays.map(a => a[i]));
}

/** Unzips array of arrays. */
function unzipArray(arr) {
    _assertArray(arr, 'arr');
    if (!arr.length) return [];
    return arr[0].map((_, i) => arr.map(a => a[i]));
}

/** Zips arrays using combiner function. */
function zipWith(fn, ...arrays) {
    _assertFn(fn, 'fn');
    return zipArray(...arrays).map(group => fn(...group));
}

/** Creates object from keys and values arrays. */
function zipObject(keys, values) {
    _assertArray(keys, 'keys'); _assertArray(values, 'values');
    return keys.reduce((acc, k, i) => { acc[k] = values[i]; return acc; }, {});
}

/** Converts array of [key, value] pairs to object. */
function fromPairs(pairs) { _assertArray(pairs, 'pairs'); return Object.fromEntries(pairs); }

/** Converts object to array of [key, value] pairs. */
function toPairs(obj) { return Object.entries(obj); }

// ─── Combinatorics ──────────────────────────────────────────────────────────

/** Generates all combinations of size r from array. */
function combinations(arr, r) {
    _assertArray(arr, 'arr');
    const result = [];
    function combine(start, combo) {
        if (combo.length === r) { result.push([...combo]); return; }
        for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            combine(i + 1, combo);
            combo.pop();
        }
    }
    combine(0, []);
    return result;
}

/** Generates all permutations of array. */
function permutations(arr) {
    _assertArray(arr, 'arr');
    if (arr.length <= 1) return [arr];
    return arr.flatMap((v, i) => permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(p => [v, ...p]));
}

/** Generates the power set of array. */
function powerSet(arr) {
    _assertArray(arr, 'arr');
    return arr.reduce((ps, item) => [...ps, ...ps.map(combo => [...combo, item])], [[]]);
}

/** Cartesian product of two arrays. */
function cartesianProduct(arr1, arr2) {
    _assertArray(arr1, 'arr1'); _assertArray(arr2, 'arr2');
    return arr1.flatMap(a => arr2.map(b => [a, b]));
}

// ─── Sampling & Shuffle ──────────────────────────────────────────────────────

/** Returns random element from array. */
function sample(arr) {
    _assertArray(arr, 'arr');
    return arr[Math.floor(Math.random() * arr.length)];
}

/** Returns n random elements from array. */
function sampleSize(arr, n) {
    _assertArray(arr, 'arr');
    return shuffle(arr).slice(0, n);
}

/** Shuffles array (Fisher-Yates). */
function shuffle(arr) {
    _assertArray(arr, 'arr');
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ─── Mutation Helpers (return new arrays) ───────────────────────────────────

/** Inserts element at index. */
function insertAt(arr, index, element) {
    _assertArray(arr, 'arr');
    return [...arr.slice(0, index), element, ...arr.slice(index)];
}

/** Removes element at index. */
function removeAt(arr, index) {
    _assertArray(arr, 'arr');
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

/** Swaps elements at two indices. */
function swapElements(arr, i, j) {
    _assertArray(arr, 'arr');
    const a = [...arr];
    [a[i], a[j]] = [a[j], a[i]];
    return a;
}

/** Removes all occurrences of specified values. */
function without(arr, ...values) {
    _assertArray(arr, 'arr');
    const set = new Set(values);
    return arr.filter(v => !set.has(v));
}

/** Updates element at index. */
function updateAt(arr, index, value) {
    _assertArray(arr, 'arr');
    return arr.map((v, i) => (i === index ? value : v));
}

// ─── Matrix ─────────────────────────────────────────────────────────────────

/** Converts flat array to 2D matrix of given columns. */
function toMatrix(arr, cols) {
    _assertArray(arr, 'arr');
    return chunkArray(arr, cols);
}

/** Transposes a 2D matrix. */
function matrixTranspose(matrix) {
    _assertArray(matrix, 'matrix');
    return matrix[0].map((_, colIdx) => matrix.map(row => row[colIdx]));
}

// ─── Tree ────────────────────────────────────────────────────────────────────

/** Converts flat list with id/parentId to tree. */
function arrayToTree(arr, { id = 'id', parentId = 'parentId', children = 'children' } = {}) {
    _assertArray(arr, 'arr');
    const map = {};
    const roots = [];
    arr.forEach(item => { map[item[id]] = { ...item, [children]: [] }; });
    arr.forEach(item => {
        if (item[parentId] == null || !map[item[parentId]]) roots.push(map[item[id]]);
        else map[item[parentId]][children].push(map[item[id]]);
    });
    return roots;
}

module.exports = {
    isArray, isArrayEmpty, getArrayLength, firstElement, lastElement, nthElement,
    pushElement, popElement, unshiftElement, shiftElement,
    indexOfElement, includesElement, findElement, findIndexElement,
    beforeArray, afterArray,
    sumArray, averageArray, maxArray, minArray, median, mode,
    variance, standardDeviation, percentile, cumSum, cumProduct, movingAverage,
    mapArray, filterArray, reduceArray, flatArray, flatOnce, flatDepth, flatMapArray,
    uniqueArray, uniqueBy, sortArray, sortBy, reverseArray,
    compactArray, compactNullish, chunkArray, dropArray, dropRight,
    takeArray, takeRight, dropWhile, takeWhile, rotate, fillArray,
    range, rangeOf,
    intersectArray, unionArray, differenceArray, symmetricDifference,
    isSubset, arrayEquals,
    groupBy, partition, countBy, indexBy, pluck, tally, frequencies,
    zipArray, unzipArray, zipWith, zipObject, fromPairs, toPairs,
    combinations, permutations, powerSet, cartesianProduct,
    sample, sampleSize, shuffle,
    insertAt, removeAt, swapElements, without, updateAt,
    toMatrix, matrixTranspose, arrayToTree
};
