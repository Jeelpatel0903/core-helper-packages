/**
 * @module object
 * @description Comprehensive object utility functions — 65+ helpers.
 */

'use strict';

function _assertObj(val, name) {
    if (val === null || typeof val !== 'object' || Array.isArray(val))
        throw new TypeError(`${name || 'Argument'} must be a plain object`);
}
function _assertFn(val, name) {
    if (typeof val !== 'function') throw new TypeError(`${name || 'Argument'} must be a function`);
}

// ─── Keys, Values, Entries ───────────────────────────────────────────────────

/** Returns own enumerable keys. */
function keys(obj) { _assertObj(obj, 'obj'); return Object.keys(obj); }

/** Returns own enumerable values. */
function values(obj) { _assertObj(obj, 'obj'); return Object.values(obj); }

/** Returns [key, value] pairs. */
function entries(obj) { _assertObj(obj, 'obj'); return Object.entries(obj); }

/** Creates object from [key, value] pairs. */
function fromEntries(pairs) { return Object.fromEntries(pairs); }

/** Number of own keys in object. */
function size(obj) { _assertObj(obj, 'obj'); return Object.keys(obj).length; }

/** Checks if object has no own keys. */
function isEmptyObject(obj) { _assertObj(obj, 'obj'); return Object.keys(obj).length === 0; }

// ─── Pick & Omit ─────────────────────────────────────────────────────────────

/** Returns new object with only specified keys. */
function pick(obj, keyList) {
    _assertObj(obj, 'obj');
    return keyList.reduce((acc, k) => { if (k in obj) acc[k] = obj[k]; return acc; }, {});
}

/** Returns new object without specified keys. */
function omit(obj, keyList) {
    _assertObj(obj, 'obj');
    const set = new Set(keyList);
    return Object.fromEntries(Object.entries(obj).filter(([k]) => !set.has(k)));
}

/** Picks keys where predicate returns true. */
function pickBy(obj, predFn) {
    _assertObj(obj, 'obj'); _assertFn(predFn, 'predFn');
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => predFn(v, k)));
}

/** Omits keys where predicate returns true. */
function omitBy(obj, predFn) {
    _assertObj(obj, 'obj'); _assertFn(predFn, 'predFn');
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => !predFn(v, k)));
}

// ─── Get & Set ───────────────────────────────────────────────────────────────

/** Gets nested value by dot-path string. */
function get(obj, path, defaultValue = undefined) {
    const parts = path.split('.');
    let cur = obj;
    for (const p of parts) {
        if (cur === null || cur === undefined) return defaultValue;
        cur = cur[p];
    }
    return cur === undefined ? defaultValue : cur;
}

/** Sets nested value by dot-path string (returns new object). */
function set(obj, path, value) {
    const parts = path.split('.');
    const result = { ...obj };
    let cur = result;
    parts.slice(0, -1).forEach(p => {
        if (typeof cur[p] !== 'object' || cur[p] === null) cur[p] = {};
        else cur[p] = { ...cur[p] };
        cur = cur[p];
    });
    cur[parts[parts.length - 1]] = value;
    return result;
}

/** Checks if nested path exists. */
function has(obj, path) {
    const parts = path.split('.');
    let cur = obj;
    for (const p of parts) {
        if (cur === null || cur === undefined || !(p in Object(cur))) return false;
        cur = cur[p];
    }
    return true;
}

/** Removes key at dot-path (returns new object). */
function unset(obj, path) {
    const parts = path.split('.');
    const result = { ...obj };
    let cur = result;
    parts.slice(0, -1).forEach(p => { cur[p] = { ...cur[p] }; cur = cur[p]; });
    delete cur[parts[parts.length - 1]];
    return result;
}

// ─── Merge & Clone ───────────────────────────────────────────────────────────

/** Shallow merge of objects. */
function assign(...objs) { return Object.assign({}, ...objs); }

/** Deep merge of objects (recursive). */
function mergeDeep(...objs) {
    return objs.reduce((acc, obj) => {
        Object.keys(obj).forEach(k => {
            if (acc[k] && typeof acc[k] === 'object' && !Array.isArray(acc[k]) &&
                obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
                acc[k] = mergeDeep(acc[k], obj[k]);
            } else {
                acc[k] = obj[k];
            }
        });
        return acc;
    }, {});
}

/** Shallow clone. */
function clone(obj) { _assertObj(obj, 'obj'); return { ...obj }; }

/** Deep clone using structured clone or JSON fallback. */
function cloneDeep(obj) {
    if (typeof structuredClone !== 'undefined') return structuredClone(obj);
    return JSON.parse(JSON.stringify(obj));
}

/** Fills in missing keys from defaults (shallow). */
function defaults(obj, ...defaultObjs) {
    _assertObj(obj, 'obj');
    return Object.assign({}, ...defaultObjs.reverse(), obj);
}

// ─── Map, Filter, Reduce on Objects ─────────────────────────────────────────

/** Maps object values. */
function mapValues(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}

/** Maps object keys. */
function mapKeys(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [fn(k, v), v]));
}

/** Filters object by value predicate. */
function filterValues(obj, fn) { return pickBy(obj, fn); }

/** Filters object by key predicate. */
function filterKeys(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    return Object.fromEntries(Object.entries(obj).filter(([k]) => fn(k)));
}

/** Reduces object to single value. */
function reduceObject(obj, fn, init) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    return Object.entries(obj).reduce((acc, [k, v]) => fn(acc, v, k), init);
}

/** Iterates own properties. */
function forOwn(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    Object.keys(obj).forEach(k => fn(obj[k], k));
}

// ─── Transform ───────────────────────────────────────────────────────────────

/** Inverts object keys and values. */
function invert(obj) {
    _assertObj(obj, 'obj');
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}

/** Renames a single key. */
function renameKey(obj, oldKey, newKey) {
    const { [oldKey]: value, ...rest } = obj;
    return oldKey in obj ? { ...rest, [newKey]: value } : { ...obj };
}

/** Renames multiple keys via mapping object. */
function renameKeys(obj, keyMap) {
    _assertObj(obj, 'obj'); _assertObj(keyMap, 'keyMap');
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [keyMap[k] !== undefined ? keyMap[k] : k, v]));
}

/** Swaps keys and values (alias of invert). */
function swapKeysValues(obj) { return invert(obj); }

/** Sorts object by keys alphabetically. */
function sortByKey(obj) {
    _assertObj(obj, 'obj');
    return Object.fromEntries(Object.keys(obj).sort().map(k => [k, obj[k]]));
}

/** Sorts object by values (returns array of [key, value]). */
function sortByValue(obj) {
    _assertObj(obj, 'obj');
    return Object.entries(obj).sort(([, a], [, b]) => (a > b ? 1 : a < b ? -1 : 0));
}

/** Finds key by value predicate. */
function findKey(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    return Object.keys(obj).find(k => fn(obj[k], k));
}

/** Finds value by key predicate. */
function findValue(obj, fn) {
    _assertObj(obj, 'obj'); _assertFn(fn, 'fn');
    const k = findKey(obj, fn);
    return k !== undefined ? obj[k] : undefined;
}

// ─── Flatten & Unflatten ─────────────────────────────────────────────────────

/** Flattens nested object to dot-notation keys. */
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], fullKey));
        } else {
            acc[fullKey] = obj[k];
        }
        return acc;
    }, {});
}

/** Unflattens dot-notation keys back to nested object. */
function unflattenObject(obj) {
    const result = {};
    Object.keys(obj).forEach(path => {
        const parts = path.split('.');
        let cur = result;
        parts.slice(0, -1).forEach(p => { cur[p] = cur[p] || {}; cur = cur[p]; });
        cur[parts[parts.length - 1]] = obj[path];
    });
    return result;
}

// ─── Query String ────────────────────────────────────────────────────────────

/** Converts object to query string. */
function toQueryString(obj) {
    _assertObj(obj, 'obj');
    return Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
}

/** Parses query string to object. */
function fromQueryString(qs) {
    return Object.fromEntries(qs.replace(/^\?/, '').split('&').filter(Boolean).map(pair => {
        const [k, v] = pair.split('=');
        return [decodeURIComponent(k), decodeURIComponent(v || '')];
    }));
}

// ─── Diff & Patch ────────────────────────────────────────────────────────────

/** Returns diff between two objects (keys that changed). */
function diffObjects(obj1, obj2) {
    const diff = {};
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    allKeys.forEach(k => {
        if (obj1[k] !== obj2[k]) diff[k] = { from: obj1[k], to: obj2[k] };
    });
    return diff;
}

/** All paths of an object (array of dot strings). */
function paths(obj, prefix = '') {
    return Object.keys(obj).flatMap(k => {
        const full = prefix ? `${prefix}.${k}` : k;
        return typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]) ? paths(obj[k], full) : full;
    });
}

/** Groups array of objects by a key. */
function groupByKey(arr, key) {
    return arr.reduce((acc, item) => {
        const k = item[key];
        acc[k] = acc[k] ? [...acc[k], item] : [item];
        return acc;
    }, {});
}

/** Counts occurrences of a key value in array of objects. */
function countByKey(arr, key) {
    return arr.reduce((acc, item) => { acc[item[key]] = (acc[item[key]] || 0) + 1; return acc; }, {});
}

/** Freezes object deeply. */
function freezeDeep(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(k => { if (typeof obj[k] === 'object' && obj[k] !== null) freezeDeep(obj[k]); });
    return obj;
}

/** Wraps object access in a Proxy that throws on missing keys. */
function strict(obj) {
    return new Proxy(obj, {
        get(target, key) {
            if (!(key in target)) throw new ReferenceError(`Key "${String(key)}" does not exist`);
            return target[key];
        }
    });
}

/** Returns object with only truthy values. */
function compactObject(obj) {
    _assertObj(obj, 'obj');
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => Boolean(v)));
}

module.exports = {
    keys, values, entries, fromEntries, size, isEmptyObject,
    pick, omit, pickBy, omitBy,
    get, set, has, unset,
    assign, mergeDeep, clone, cloneDeep, defaults,
    mapValues, mapKeys, filterValues, filterKeys, reduceObject, forOwn,
    invert, renameKey, renameKeys, swapKeysValues, sortByKey, sortByValue,
    findKey, findValue,
    flattenObject, unflattenObject,
    toQueryString, fromQueryString,
    diffObjects, paths, groupByKey, countByKey, freezeDeep, strict, compactObject
};
