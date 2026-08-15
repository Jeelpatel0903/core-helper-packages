/**
 * @module number
 * @description Comprehensive number, math, and unit conversion utilities — 65+ helpers.
 */

'use strict';

function _assertNum(val, name) {
    if (typeof val !== 'number' || Number.isNaN(val)) throw new TypeError(`${name || 'Argument'} must be a number`);
}

// ─── Clamp & Range ───────────────────────────────────────────────────────────

/** Clamps number between min and max. */
function clamp(num, min, max) { _assertNum(num, 'num'); return Math.min(Math.max(num, min), max); }

/** Checks if number is in range [min, max]. */
function inRange(num, min, max) { _assertNum(num, 'num'); return num >= min && num <= max; }

/** Normalizes num from [min, max] to [0, 1]. */
function normalize(num, min, max) { return (num - min) / (max - min); }

/** Maps value from one range to another. */
function mapRange(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

// ─── Random ──────────────────────────────────────────────────────────────────

/** Random float in [min, max). */
function random(min = 0, max = 1) { return Math.random() * (max - min) + min; }

/** Random integer in [min, max]. */
function randomInt(min, max) { return Math.floor(random(min, max + 1)); }

/** Random float rounded to decimals. */
function randomFloat(min, max, decimals = 2) { return parseFloat(random(min, max).toFixed(decimals)); }

// ─── Rounding ────────────────────────────────────────────────────────────────

/** Rounds to n decimal places. */
function roundTo(num, decimals = 0) { _assertNum(num, 'num'); return parseFloat(num.toFixed(decimals)); }

/** Rounds up to n decimal places. */
function ceilTo(num, decimals = 0) {
    const factor = 10 ** decimals;
    return Math.ceil(num * factor) / factor;
}

/** Rounds down to n decimal places. */
function floorTo(num, decimals = 0) {
    const factor = 10 ** decimals;
    return Math.floor(num * factor) / factor;
}

// ─── Math Basics ─────────────────────────────────────────────────────────────

/** Absolute value. */
function abs(num) { _assertNum(num, 'num'); return Math.abs(num); }

/** Sign of number (-1, 0, 1). */
function sign(num) { _assertNum(num, 'num'); return Math.sign(num); }

/** Truncates decimal part. */
function trunc(num) { _assertNum(num, 'num'); return Math.trunc(num); }

/** Square root. */
function sqrt(num) { _assertNum(num, 'num'); return Math.sqrt(num); }

/** Cube root. */
function cbrt(num) { _assertNum(num, 'num'); return Math.cbrt(num); }

/** Power of a to b. */
function pow(a, b) { return Math.pow(a, b); }

/** Natural log. */
function log(num) { _assertNum(num, 'num'); return Math.log(num); }

/** Log base 2. */
function log2(num) { _assertNum(num, 'num'); return Math.log2(num); }

/** Log base 10. */
function log10(num) { _assertNum(num, 'num'); return Math.log10(num); }

// ─── Number Theory ───────────────────────────────────────────────────────────

/** Greatest common divisor (GCD) via Euclidean algorithm. */
function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }

/** Least common multiple (LCM). */
function lcm(a, b) { return Math.abs(a * b) / gcd(a, b); }

/** Factorial of n. */
function factorial(n) {
    if (n < 0) throw new RangeError('Negative factorial');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

/** nth Fibonacci number (iterative). */
function fibonacci(n) {
    if (n < 0) throw new RangeError('Negative index');
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
    return b;
}

/** Fibonacci sequence as array. */
function fibonacciSequence(n) {
    return Array.from({ length: n }, (_, i) => fibonacci(i));
}

/** Checks if n is prime. */
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
    return true;
}

/** Returns list of primes up to n (Sieve of Eratosthenes). */
function primesUpTo(n) {
    const sieve = new Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;
    for (let i = 2; i * i <= n; i++) if (sieve[i]) for (let j = i * i; j <= n; j += i) sieve[j] = false;
    return sieve.map((v, i) => (v ? i : null)).filter(Boolean);
}

/** Gets next prime after n. */
function nextPrime(n) { let i = n + 1; while (!isPrime(i)) i++; return i; }

/** Gets previous prime before n. */
function prevPrime(n) { if (n <= 2) return null; let i = n - 1; while (i > 1 && !isPrime(i)) i--; return i > 1 ? i : null; }

/** Checks if n is a perfect number. */
function isPerfect(n) { if (n <= 1) return false; let s = 1; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { s += i; if (i !== n / i) s += n / i; } return s === n; }

/** Checks if n is abundant (sum of divisors > n). */
function isAbundant(n) { if (n <= 0) return false; let s = 1; for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { s += i; if (i !== n / i) s += n / i; } return s > n; }

/** Digit sum of an integer. */
function digitSum(n) { return Math.abs(n).toString().split('').reduce((s, d) => s + Number(d), 0); }

/** Digit product of an integer. */
function digitProduct(n) { return Math.abs(n).toString().split('').reduce((p, d) => p * Number(d), 1); }

/** Reverses digits of a number. */
function reverseNumber(n) { _assertNum(n, 'n'); const neg = n < 0; return parseInt((neg ? -n : n).toString().split('').reverse().join(''), 10) * (neg ? -1 : 1); }

/** Checks if integer is a numeric palindrome. */
function isNumericPalindrome(n) { const s = Math.abs(n).toString(); return s === s.split('').reverse().join(''); }

// ─── Base Conversion ─────────────────────────────────────────────────────────

/** Converts decimal to binary string. */
function toBinary(n) { _assertNum(n, 'n'); return (n >>> 0).toString(2); }

/** Converts decimal to octal string. */
function toOctal(n) { _assertNum(n, 'n'); return n.toString(8); }

/** Converts decimal to hex string. */
function toHex(n) { _assertNum(n, 'n'); return n.toString(16).toUpperCase(); }

/** Converts binary string to decimal. */
function fromBinary(bin) { return parseInt(bin, 2); }

/** Converts octal string to decimal. */
function fromOctal(oct) { return parseInt(oct, 8); }

/** Converts hex string to decimal. */
function fromHex(hex) { return parseInt(hex, 16); }

/** Converts number from any base to another. */
function convertBase(numStr, fromBase, toBase) { return parseInt(numStr, fromBase).toString(toBase); }

// ─── Formatting ──────────────────────────────────────────────────────────────

/** Formats number with thousands separators. */
function formatNumber(num, locale = 'en-US') {
    _assertNum(num, 'num');
    return new Intl.NumberFormat(locale).format(num);
}

/** Formats number as currency. */
function formatCurrency(num, currency = 'USD', locale = 'en-US') {
    _assertNum(num, 'num');
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
}

/** Formats number as percentage. */
function formatPercent(num, decimals = 2, locale = 'en-US') {
    _assertNum(num, 'num');
    return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: decimals }).format(num / 100);
}

/** Formats bytes to human readable (KB, MB, GB…). */
function formatBytes(bytes, decimals = 2) {
    _assertNum(bytes, 'bytes');
    if (bytes === 0) return '0 Bytes';
    const k = 1024, dm = Math.max(0, decimals);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// ─── Unit Conversions ────────────────────────────────────────────────────────

/** Bytes to KB. */
function bytesToKB(b) { return b / 1024; }
/** Bytes to MB. */
function bytesToMB(b) { return b / (1024 ** 2); }
/** Bytes to GB. */
function bytesToGB(b) { return b / (1024 ** 3); }
/** KB to bytes. */
function kbToBytes(kb) { return kb * 1024; }
/** MB to bytes. */
function mbToBytes(mb) { return mb * (1024 ** 2); }
/** GB to bytes. */
function gbToBytes(gb) { return gb * (1024 ** 3); }

/** Degrees to radians. */
function degreesToRadians(deg) { return deg * (Math.PI / 180); }
/** Radians to degrees. */
function radiansToDegrees(rad) { return rad * (180 / Math.PI); }

/** Celsius to Fahrenheit. */
function celsiusToFahrenheit(c) { return (c * 9) / 5 + 32; }
/** Fahrenheit to Celsius. */
function fahrenheitToCelsius(f) { return ((f - 32) * 5) / 9; }
/** Celsius to Kelvin. */
function celsiusToKelvin(c) { return c + 273.15; }
/** Kelvin to Celsius. */
function kelvinToCelsius(k) { return k - 273.15; }
/** Fahrenheit to Kelvin. */
function fahrenheitToKelvin(f) { return celsiusToKelvin(fahrenheitToCelsius(f)); }
/** Kelvin to Fahrenheit. */
function kelvinToFahrenheit(k) { return celsiusToFahrenheit(kelvinToCelsius(k)); }

/** Kilometers to miles. */
function kmToMiles(km) { return km * 0.621371; }
/** Miles to kilometers. */
function milesToKm(miles) { return miles * 1.60934; }
/** Kilograms to pounds. */
function kgToLbs(kg) { return kg * 2.20462; }
/** Pounds to kilograms. */
function lbsToKg(lbs) { return lbs * 0.453592; }
/** Meters to feet. */
function metersToFeet(m) { return m * 3.28084; }
/** Feet to meters. */
function feetToMeters(ft) { return ft * 0.3048; }
/** Liters to US gallons. */
function litersToGallons(l) { return l * 0.264172; }
/** US gallons to liters. */
function gallonsToLiters(gal) { return gal * 3.78541; }
/** Meters per second to km/h. */
function msToKmh(ms) { return ms * 3.6; }
/** km/h to meters per second. */
function kmhToMs(kmh) { return kmh / 3.6; }

/** Calculates percentage: what percent of total is part. */
function percentage(part, total) { return (part / total) * 100; }

/** Calculates what value is p% of total. */
function percentageOf(p, total) { return (p / 100) * total; }

/** Calculates percentage change from old to new. */
function percentageChange(oldVal, newVal) { return ((newVal - oldVal) / oldVal) * 100; }

module.exports = {
    clamp, inRange, normalize, mapRange,
    random, randomInt, randomFloat,
    roundTo, ceilTo, floorTo,
    abs, sign, trunc, sqrt, cbrt, pow, log, log2, log10,
    gcd, lcm, factorial, fibonacci, fibonacciSequence,
    isPrime, primesUpTo, nextPrime, prevPrime, isPerfect, isAbundant,
    digitSum, digitProduct, reverseNumber, isNumericPalindrome,
    toBinary, toOctal, toHex, fromBinary, fromOctal, fromHex, convertBase,
    formatNumber, formatCurrency, formatPercent, formatBytes,
    bytesToKB, bytesToMB, bytesToGB, kbToBytes, mbToBytes, gbToBytes,
    degreesToRadians, radiansToDegrees,
    celsiusToFahrenheit, fahrenheitToCelsius, celsiusToKelvin, kelvinToCelsius,
    fahrenheitToKelvin, kelvinToFahrenheit,
    kmToMiles, milesToKm, kgToLbs, lbsToKg, metersToFeet, feetToMeters,
    litersToGallons, gallonsToLiters, msToKmh, kmhToMs,
    percentage, percentageOf, percentageChange
};
