/**
 * Checks if the given value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a string, otherwise false.
 */
function isString(value) {
    return typeof value === 'string';
}

/**
 * Checks if the given value is an array.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is an array, otherwise false.
 */
function isArray(value) {
    return Array.isArray(value);
}

/**
 * Checks if the given value is null.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is null, otherwise false.
 */
function isNull(value) {
    return value === null;
}

/**
 * Checks if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is undefined, otherwise false.
 */
function isUndefined(value) {
    return value === undefined;
}

/**
 * Checks if the given value is either null or undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is null or undefined, otherwise false.
 */
function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
}

/**
 * Checks if an array is empty.
 * @param {Array} arr - The array to check.
 * @returns {boolean} - Returns true if the array is empty, otherwise false.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function isArrayEmpty(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr.length === 0;
}

/**
 * Gets the length of an array.
 * @param {Array} arr - The array to get the length of.
 * @returns {number} - The length of the array.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function getArrayLength(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr.length;
}

/**
 * Retrieves the first element of an array.
 * @param {Array} arr - The array to get the first element from.
 * @returns {*} - The first element of the array.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function firstElement(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr[0];
}

/**
 * Retrieves the last element of an array.
 * @param {Array} arr - The array to get the last element from.
 * @returns {*} - The last element of the array or undefined if the array is empty.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function lastElement(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

/**
 * Adds an element to the end of an array.
 * @param {Array} arr - The array to modify.
 * @param {*} element - The element to add.
 * @returns {Array} - The array with the new element added.
 * @throws {TypeError} - Throws an error if the first argument is not an array.
 */
function pushElement(arr, element) {
    if (!isArray(arr)) {
        throw new TypeError('Expected the first argument to be an array');
    }
    arr.push(element);
    return arr;
}

/**
 * Removes the last element from an array.
 * @param {Array} arr - The array to modify.
 * @returns {Array} - The array with the last element removed.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function popElement(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected the first argument to be an array');
    }
    arr.pop(); // Removes the last element
    return arr;
}

/**
 * Calculates the sum of all numeric values in an array.
 * @param {Array} arr - The array containing numeric values.
 * @returns {number} - The sum of the numeric values in the array.
 * @throws {TypeError} - Throws an error if the input is not an array or contains non-numeric values.
 */
function sumArray(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr.reduce((sum, value) => {
        if (typeof value !== 'number') {
            throw new TypeError('Array contains non-numeric values');
        }
        return sum + value;
    }, 0);
}

/**
 * Calculates the average of all numeric values in an array.
 * @param {Array} arr - The array containing numeric values.
 * @returns {number} - The average of the numeric values in the array.
 * @throws {TypeError} - Throws an error if the input is not an array or contains non-numeric values.
 */
function averageArray(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    if (arr.length === 0) {
        return NaN; // Return NaN for empty arrays
    }
    const sum = arr.reduce((acc, value) => {
        if (typeof value !== 'number') {
            throw new TypeError('Array contains non-numeric values');
        }
        return acc + value;
    }, 0);
    return sum / arr.length;
}

/**
 * Finds the maximum value in an array.
 * @param {Array} arr - The array to search.
 * @returns {number} - The maximum value in the array.
 * @throws {TypeError} - Throws an error if the input is not a non-empty array.
 */
function maxArray(arr) {
    if (!isArray(arr) || arr.length === 0) {
        throw new TypeError('Expected a non-empty array');
    }
    return Math.max(...arr);
}

/**
 * Finds the minimum value in an array.
 * @param {Array} arr - The array to search.
 * @returns {number} - The minimum value in the array.
 * @throws {TypeError} - Throws an error if the input is not a non-empty array.
 */
function minArray(arr) {
    if (!isArray(arr) || arr.length === 0) {
        throw new TypeError('Expected a non-empty array');
    }
    return Math.min(...arr);
}

/**
 * Applies a function to each element of the array and returns a new array.
 * @param {Array} arr - The array to map over.
 * @param {Function} callback - The function to apply to each element.
 * @returns {Array} - A new array with each element transformed by the callback function.
 * @throws {TypeError} - Throws an error if the first argument is not an array or the second argument is not a function.
 */
function mapArray(arr, callback) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Expected a function');
    }
    return arr.map(callback);
}

/**
 * Filters elements of the array based on a predicate function and returns a new array.
 * @param {Array} arr - The array to filter.
 * @param {Function} predicate - The function to test each element.
 * @returns {Array} - A new array with elements that pass the predicate function.
 * @throws {TypeError} - Throws an error if the first argument is not an array or the second argument is not a function.
 */
function filterArray(arr, predicate) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('Expected a function');
    }
    return arr.filter(predicate);
}

/**
 * Flattens a nested array into a single-level array.
 * @param {Array} arr - The nested array to flatten.
 * @returns {Array} - The flattened array.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function flatArray(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return arr.flat(Infinity);
}

/**
 * Removes duplicate values from an array.
 * @param {Array} arr - The array from which to remove duplicates.
 * @returns {Array} - The array with duplicate values removed.
 * @throws {TypeError} - Throws an error if the input is not an array.
 */
function uniqueArray(arr) {
    if (!isArray(arr)) {
        throw new TypeError('Expected an array');
    }
    return [...new Set(arr)];
}

function beforeArray(array, index) {
    return array.slice(0, index);
}

function afterArray(array, index) {
    if (index < 0 || index >= array.length - 1) {
        return [];
    }
    return array.slice(index + 1);
}


function compactArray(array) {
    if(!isArray(array)) {
        throw new TypeError('Expected an array');
    }
    return array.filter(x => x !== null && x !== undefined && x !== 0 && x !== false && x !== '' && !Number.isNaN(x));
}


function differenceArray(array1, array2) {
    if(!isArray(array1) || !isArray(array2)) {
        throw new TypeError('Expected an array');
    }
    return array1.filter(item => !array2.includes(item));
}


module.exports = {
    isString,
    isArray,
    isNullOrUndefined,
    isArrayEmpty,
    isNull,
    isUndefined,
    getArrayLength,
    firstElement,
    lastElement,
    pushElement,
    popElement,
    minArray,
    maxArray,
    averageArray,
    sumArray,
    mapArray,
    filterArray,
    flatArray,
    uniqueArray,
    beforeArray,
    afterArray,
    compactArray,
    differenceArray
};
