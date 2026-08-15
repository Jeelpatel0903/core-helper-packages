/**
 * @module type
 * @description Comprehensive type-checking utility functions.
 */

/** Checks if value is a string. */
function isString(value) { return typeof value === 'string'; }

/** Checks if value is a number (and not NaN). */
function isNumber(value) { return typeof value === 'number' && !Number.isNaN(value); }

/** Checks if value is a boolean. */
function isBoolean(value) { return typeof value === 'boolean'; }

/** Checks if value is a plain object (not array, null, or class instance). */
function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }

/** Checks if value is a function. */
function isFunction(value) { return typeof value === 'function'; }

/** Checks if value is an array. */
function isArray(value) { return Array.isArray(value); }

/** Checks if value is null. */
function isNull(value) { return value === null; }

/** Checks if value is undefined. */
function isUndefined(value) { return value === undefined; }

/** Checks if value is null or undefined. */
function isNullOrUndefined(value) { return value === null || value === undefined; }

/** Checks if value is an integer. */
function isInteger(value) { return Number.isInteger(value); }

/** Checks if value is a float (number with decimal part). */
function isFloat(value) { return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value); }

/** Checks if value is NaN. */
function isNaN(value) { return Number.isNaN(value); }

/** Checks if value is finite. */
function isFinite(value) { return Number.isFinite(value); }

/** Checks if value is a Date object and valid. */
function isDate(value) { return value instanceof Date && !Number.isNaN(value.getTime()); }

/** Checks if value is a RegExp. */
function isRegExp(value) { return value instanceof RegExp; }

/** Checks if value is a Symbol. */
function isSymbol(value) { return typeof value === 'symbol'; }

/** Checks if value is a BigInt. */
function isBigInt(value) { return typeof value === 'bigint'; }

/** Checks if value is a Map. */
function isMap(value) { return value instanceof Map; }

/** Checks if value is a Set. */
function isSet(value) { return value instanceof Set; }

/** Checks if value is a WeakMap. */
function isWeakMap(value) { return value instanceof WeakMap; }

/** Checks if value is a WeakSet. */
function isWeakSet(value) { return value instanceof WeakSet; }

/** Checks if value is a Promise. */
function isPromise(value) { return value instanceof Promise || (isObject(value) && isFunction(value.then) && isFunction(value.catch)); }

/** Checks if value is an Error. */
function isError(value) { return value instanceof Error; }

/** Checks if value is an ArrayBuffer. */
function isArrayBuffer(value) { return value instanceof ArrayBuffer; }

/** Checks if value is a TypedArray (Uint8Array, Float32Array, etc). */
function isTypedArray(value) {
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
}

/** Checks if value is a generator function. */
function isGeneratorFunction(value) {
    if (!isFunction(value)) return false;
    return value.constructor && value.constructor.name === 'GeneratorFunction';
}

/** Checks if value is a plain object (created via {} or new Object()). */
function isPlainObject(value) {
    if (!isObject(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

/** Checks if value is iterable (has Symbol.iterator). */
function isIterable(value) {
    return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}

/** Checks if value is an async function. */
function isAsyncFunction(value) {
    return isFunction(value) && value.constructor && value.constructor.name === 'AsyncFunction';
}

/** Checks if value is empty (empty string, array, object, null, undefined). */
function isEmpty(value) {
    if (isNullOrUndefined(value)) return true;
    if (isString(value) || isArray(value)) return value.length === 0;
    if (isObject(value)) return Object.keys(value).length === 0;
    if (isMap(value) || isSet(value)) return value.size === 0;
    return false;
}

/** Checks if value is truthy. */
function isTruthy(value) { return !!value; }

/** Checks if value is falsy. */
function isFalsy(value) { return !value; }

/** Shallow equality check for two values. */
function isEqual(a, b) { return a === b; }

/** Deep equality check for two values. */
function isDeepEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (typeof a !== typeof b) return false;
    if (isDate(a) && isDate(b)) return a.getTime() === b.getTime();
    if (isRegExp(a) && isRegExp(b)) return a.toString() === b.toString();
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((v, i) => isDeepEqual(v, b[i]));
    }
    if (isObject(a) && isObject(b)) {
        const keysA = Object.keys(a), keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        return keysA.every(k => isDeepEqual(a[k], b[k]));
    }
    return false;
}

/** Checks if value is a primitive (string, number, boolean, null, undefined, symbol, bigint). */
function isPrimitive(value) {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

/** Checks if value is object-like (not null and typeof object). */
function isObjectLike(value) { return value !== null && typeof value === 'object'; }

/** Checks if value is a non-empty string. */
function isNonEmptyString(value) { return isString(value) && value.length > 0; }

/** Checks if value is a positive number. */
function isPositive(value) { return isNumber(value) && value > 0; }

/** Checks if value is a negative number. */
function isNegative(value) { return isNumber(value) && value < 0; }

/** Checks if value is zero. */
function isZero(value) { return value === 0; }

/** Checks if value is a safe integer (within Number.MAX_SAFE_INTEGER). */
function isSafeInteger(value) { return Number.isSafeInteger(value); }

/** Checks if value is an even number. */
function isEven(value) { return isInteger(value) && value % 2 === 0; }

/** Checks if value is an odd number. */
function isOdd(value) { return isInteger(value) && Math.abs(value % 2) === 1; }

/** Returns the type name of a value as a string. */
function typeOf(value) {
    if (isNull(value)) return 'null';
    if (isArray(value)) return 'array';
    if (isDate(value)) return 'date';
    if (isRegExp(value)) return 'regexp';
    if (isMap(value)) return 'map';
    if (isSet(value)) return 'set';
    if (isPromise(value)) return 'promise';
    if (isError(value)) return 'error';
    return typeof value;
}

module.exports = {
    isString, isNumber, isBoolean, isObject, isFunction, isArray,
    isNull, isUndefined, isNullOrUndefined, isInteger, isFloat,
    isNaN, isFinite, isDate, isRegExp, isSymbol, isBigInt,
    isMap, isSet, isWeakMap, isWeakSet, isPromise, isError,
    isArrayBuffer, isTypedArray, isGeneratorFunction, isPlainObject,
    isIterable, isAsyncFunction, isEmpty, isTruthy, isFalsy,
    isEqual, isDeepEqual, isPrimitive, isObjectLike, isNonEmptyString,
    isPositive, isNegative, isZero, isSafeInteger, isEven, isOdd, typeOf
};
