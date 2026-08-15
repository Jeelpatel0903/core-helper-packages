/**
 * @module string
 * @description Comprehensive string utility functions — 80+ helpers.
 */

'use strict';

function _assertStr(val, name) {
    if (typeof val !== 'string') throw new TypeError(`${name || 'Argument'} must be a string`);
}
function _assertNum(val, name) {
    if (typeof val !== 'number') throw new TypeError(`${name || 'Argument'} must be a number`);
}

// ─── Case Conversion ─────────────────────────────────────────────────────────

/** Capitalizes the first character. */
function capitalize(str) { _assertStr(str, 'str'); return str.charAt(0).toUpperCase() + str.slice(1); }

/** Capitalizes the first character of every word. */
function capitalizeWords(str) { _assertStr(str, 'str'); return str.replace(/\b\w/g, c => c.toUpperCase()); }

/** Converts to camelCase. */
function camelCase(str) {
    _assertStr(str, 'str');
    return str.replace(/[\s_\-]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toLowerCase());
}

/** Converts to snake_case. */
function snakeCase(str) {
    _assertStr(str, 'str');
    return str.replace(/([A-Z])/g, '_$1').replace(/[\s\-]+/g, '_').toLowerCase().replace(/^_/, '');
}

/** Converts to kebab-case. */
function kebabCase(str) {
    _assertStr(str, 'str');
    return str.replace(/([A-Z])/g, '-$1').replace(/[\s_]+/g, '-').toLowerCase().replace(/^-/, '');
}

/** Converts to PascalCase. */
function pascalCase(str) {
    _assertStr(str, 'str');
    return str.replace(/[\s_\-]+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toUpperCase());
}

/** Converts to Title Case. */
function titleCase(str) { return capitalizeWords(str.toLowerCase()); }

/** Converts to CONSTANT_CASE. */
function constantCase(str) { return snakeCase(str).toUpperCase(); }

/** Converts to dot.case. */
function dotCase(str) { _assertStr(str, 'str'); return snakeCase(str).replace(/_/g, '.'); }

/** Converts to path/case. */
function pathCase(str) { _assertStr(str, 'str'); return snakeCase(str).replace(/_/g, '/'); }

/** Swaps case of each character. */
function swapCase(str) {
    _assertStr(str, 'str');
    return str.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
}

// ─── Trim & Pad ──────────────────────────────────────────────────────────────

/** Trims whitespace from both ends. */
function trim(str) { _assertStr(str, 'str'); return str.trim(); }

/** Trims whitespace from start. */
function trimStart(str) { _assertStr(str, 'str'); return str.trimStart(); }

/** Trims whitespace from end. */
function trimEnd(str) { _assertStr(str, 'str'); return str.trimEnd(); }

/** Pads start of string to length. */
function padStart(str, len, char = ' ') { _assertStr(str, 'str'); return str.padStart(len, char); }

/** Pads end of string to length. */
function padEnd(str, len, char = ' ') { _assertStr(str, 'str'); return str.padEnd(len, char); }

/** Pads both sides of string to length. */
function padBoth(str, len, char = ' ') {
    _assertStr(str, 'str');
    const totalPad = Math.max(0, len - str.length);
    const padL = Math.floor(totalPad / 2);
    const padR = Math.ceil(totalPad / 2);
    return char.repeat(padL) + str + char.repeat(padR);
}

// ─── Repeat & Reverse ────────────────────────────────────────────────────────

/** Repeats string n times. */
function repeat(str, n) { _assertStr(str, 'str'); return str.repeat(n); }

/** Reverses a string. */
function reverse(str) { _assertStr(str, 'str'); return str.split('').reverse().join(''); }

/** Reverses words in a string. */
function reverseWords(str) { _assertStr(str, 'str'); return str.split(/\s+/).reverse().join(' '); }

// ─── Checks ──────────────────────────────────────────────────────────────────

/** Checks if string is a palindrome. */
function isPalindrome(str) {
    _assertStr(str, 'str');
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === reverse(clean);
}

/** Checks if two strings are anagrams. */
function isAnagram(a, b) {
    _assertStr(a, 'a'); _assertStr(b, 'b');
    const norm = s => s.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
    return norm(a) === norm(b);
}

/** Checks if string starts with prefix. */
function startsWith(str, prefix) { _assertStr(str, 'str'); return str.startsWith(prefix); }

/** Checks if string ends with suffix. */
function endsWith(str, suffix) { _assertStr(str, 'str'); return str.endsWith(suffix); }

/** Checks if string includes substring. */
function includesStr(str, sub) { _assertStr(str, 'str'); return str.includes(sub); }

/** Checks if string is empty or only whitespace. */
function isBlank(str) { _assertStr(str, 'str'); return str.trim().length === 0; }

// ─── Count & Extract ─────────────────────────────────────────────────────────

/** Counts occurrences of substring. */
function countOccurrences(str, sub) {
    _assertStr(str, 'str'); _assertStr(sub, 'sub');
    if (!sub) return 0;
    return str.split(sub).length - 1;
}

/** Counts words in string. */
function wordCount(str) { _assertStr(str, 'str'); return str.trim().split(/\s+/).filter(Boolean).length; }

/** Counts characters (excluding spaces). */
function charCount(str, includeSpaces = true) {
    _assertStr(str, 'str');
    return includeSpaces ? str.length : str.replace(/\s/g, '').length;
}

/** Counts lines in string. */
function lineCount(str) { _assertStr(str, 'str'); return str.split('\n').length; }

/** Gets nth word from string. */
function nthWord(str, n) { _assertStr(str, 'str'); return str.trim().split(/\s+/)[n]; }

/** Extracts all email addresses from string. */
function extractEmails(str) {
    _assertStr(str, 'str');
    return str.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) || [];
}

/** Extracts all URLs from string. */
function extractUrls(str) {
    _assertStr(str, 'str');
    return str.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/g) || [];
}

/** Extracts all hashtags from string. */
function extractHashtags(str) {
    _assertStr(str, 'str');
    return str.match(/#[a-zA-Z0-9_]+/g) || [];
}

/** Extracts all @mentions from string. */
function extractMentions(str) {
    _assertStr(str, 'str');
    return str.match(/@[a-zA-Z0-9_]+/g) || [];
}

/** Extracts numbers from string. */
function extractNumbers(str) {
    _assertStr(str, 'str');
    const matches = str.match(/-?\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
}

// ─── Replace & Transform ─────────────────────────────────────────────────────

/** Replaces all occurrences of search with replace. */
function replaceAll(str, search, replace) { _assertStr(str, 'str'); return str.split(search).join(replace); }

/** Strips HTML tags from string. */
function stripHtml(str) { _assertStr(str, 'str'); return str.replace(/<[^>]*>/g, ''); }

/** Escapes HTML entities. */
function escapeHtml(str) {
    _assertStr(str, 'str');
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/** Unescapes HTML entities. */
function unescapeHtml(str) {
    _assertStr(str, 'str');
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

/** Escapes special regex characters. */
function escapeRegex(str) { _assertStr(str, 'str'); return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** Converts string to URL-friendly slug. */
function slugify(str) {
    _assertStr(str, 'str');
    return str.toLowerCase().trim().replace(/[^a-z0-9\s\-]/g, '').replace(/[\s]+/g, '-').replace(/-+/g, '-');
}

/** Converts slug back to readable string. */
function deslugify(str) { _assertStr(str, 'str'); return str.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); }

/** Truncates string to maxLen with optional suffix. */
function truncate(str, maxLen, suffix = '...') {
    _assertStr(str, 'str');
    return str.length <= maxLen ? str : str.slice(0, maxLen - suffix.length) + suffix;
}

/** Truncates at word boundary. */
function truncateWords(str, maxWords, suffix = '...') {
    _assertStr(str, 'str');
    const words = str.split(/\s+/);
    return words.length <= maxWords ? str : words.slice(0, maxWords).join(' ') + suffix;
}

/** Wraps text at word boundary to given line length. */
function wrapText(str, maxLen) {
    _assertStr(str, 'str');
    const words = str.split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
        if ((line + word).length > maxLen && line) { lines.push(line.trim()); line = ''; }
        line += word + ' ';
    });
    if (line.trim()) lines.push(line.trim());
    return lines.join('\n');
}

/** Adds indentation to each line. */
function indent(str, spaces = 2) { _assertStr(str, 'str'); return str.split('\n').map(l => ' '.repeat(spaces) + l).join('\n'); }

/** Removes leading whitespace from each line. */
function dedent(str) {
    _assertStr(str, 'str');
    const lines = str.split('\n');
    const minIndent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length));
    return lines.map(l => l.slice(minIndent)).join('\n');
}

// ─── Masking ─────────────────────────────────────────────────────────────────

/** Masks middle characters of string. */
function maskString(str, visibleStart = 2, visibleEnd = 2, char = '*') {
    _assertStr(str, 'str');
    if (str.length <= visibleStart + visibleEnd) return char.repeat(str.length);
    return str.slice(0, visibleStart) + char.repeat(str.length - visibleStart - visibleEnd) + str.slice(-visibleEnd || str.length);
}

/** Masks email address (shows first 2 chars and domain). */
function maskEmail(email) {
    _assertStr(email, 'email');
    const [local, domain] = email.split('@');
    return local.slice(0, 2) + '***@' + domain;
}

/** Masks phone number (shows last 4 digits). */
function maskPhone(phone) {
    _assertStr(phone, 'phone');
    return phone.replace(/\d(?=\d{4})/g, '*');
}

/** Masks credit card number (shows last 4 digits). */
function maskCreditCard(num) {
    _assertStr(num, 'num');
    return num.replace(/\d(?=\d{4})/g, '*');
}

// ─── Encoding & Hashing ──────────────────────────────────────────────────────

/** Encodes string to Base64 (browser + Node). */
function base64Encode(str) {
    _assertStr(str, 'str');
    if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
    if (typeof btoa !== 'undefined') return btoa(unescape(encodeURIComponent(str)));
    throw new Error('No base64 encoder available');
}

/** Decodes Base64 string. */
function base64Decode(str) {
    _assertStr(str, 'str');
    if (typeof Buffer !== 'undefined') return Buffer.from(str, 'base64').toString('utf8');
    if (typeof atob !== 'undefined') return decodeURIComponent(escape(atob(str)));
    throw new Error('No base64 decoder available');
}

/** Encodes string to hex. */
function hexEncode(str) {
    _assertStr(str, 'str');
    return str.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

/** Decodes hex string to text. */
function hexDecode(hex) {
    _assertStr(hex, 'hex');
    return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
}

/** Applies ROT13 cipher. */
function rot13(str) {
    _assertStr(str, 'str');
    return str.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
}

/** Applies Caesar cipher with given shift. */
function caesarCipher(str, shift) {
    _assertStr(str, 'str');
    return str.replace(/[a-zA-Z]/g, c => {
        const base = c >= 'a' ? 97 : 65;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    });
}

// ─── Distance & Similarity ───────────────────────────────────────────────────

/** Levenshtein edit distance between two strings. */
function levenshteinDistance(a, b) {
    _assertStr(a, 'a'); _assertStr(b, 'b');
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[m][n];
}

/** Jaro-Winkler similarity (0–1). */
function jaroWinkler(s1, s2) {
    _assertStr(s1, 's1'); _assertStr(s2, 's2');
    if (s1 === s2) return 1;
    const len1 = s1.length, len2 = s2.length;
    const matchDist = Math.floor(Math.max(len1, len2) / 2) - 1;
    const s1Matches = new Array(len1).fill(false), s2Matches = new Array(len2).fill(false);
    let matches = 0, transpositions = 0;
    for (let i = 0; i < len1; i++) {
        const start = Math.max(0, i - matchDist), end = Math.min(i + matchDist + 1, len2);
        for (let j = start; j < end; j++) {
            if (s2Matches[j] || s1[i] !== s2[j]) continue;
            s1Matches[i] = s2Matches[j] = true;
            matches++;
            break;
        }
    }
    if (!matches) return 0;
    let k = 0;
    for (let i = 0; i < len1; i++) {
        if (!s1Matches[i]) continue;
        while (!s2Matches[k]) k++;
        if (s1[i] !== s2[k++]) transpositions++;
    }
    const jaro = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;
    let prefix = 0;
    for (let i = 0; i < Math.min(4, Math.min(len1, len2)); i++) {
        if (s1[i] === s2[i]) prefix++;
        else break;
    }
    return jaro + prefix * 0.1 * (1 - jaro);
}

/** Returns longest common prefix of two strings. */
function longestCommonPrefix(a, b) {
    _assertStr(a, 'a'); _assertStr(b, 'b');
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return a.slice(0, i);
}

/** Returns longest common substring of two strings. */
function longestCommonSubstring(a, b) {
    _assertStr(a, 'a'); _assertStr(b, 'b');
    let maxLen = 0, endIdx = 0;
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLen) { maxLen = dp[i][j]; endIdx = i; }
            }
    return a.slice(endIdx - maxLen, endIdx);
}

// ─── Formatting & Utilities ──────────────────────────────────────────────────

/** Gets initials from a name string. */
function getInitials(str) {
    _assertStr(str, 'str');
    return str.trim().split(/\s+/).map(w => w[0].toUpperCase()).join('');
}

/** Abbreviates string to n characters with dot. */
function abbreviate(str, n = 3) {
    _assertStr(str, 'str');
    return str.slice(0, n) + (str.length > n ? '.' : '');
}

/** Humanizes an identifier (camel/snake) to readable text. */
function humanize(str) {
    _assertStr(str, 'str');
    return str.replace(/([A-Z])/g, ' $1').replace(/[_\-]+/g, ' ').trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());
}

/** Converts a string to ordinal number representation. */
function ordinalize(n) {
    const num = parseInt(n, 10);
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}

/** Pluralizes a word (basic English rules). */
function pluralize(word, count = 2) {
    _assertStr(word, 'word');
    if (count === 1) return word;
    if (/[sxz]$|[cs]h$/.test(word)) return word + 'es';
    if (/[^aeiou]y$/.test(word)) return word.slice(0, -1) + 'ies';
    return word + 's';
}

/** Singularizes a word (basic English rules). */
function singularize(word) {
    _assertStr(word, 'word');
    if (/ies$/.test(word)) return word.slice(0, -3) + 'y';
    if (/ses$|xes$|zes$|ches$|shes$/.test(word)) return word.slice(0, -2);
    if (/s$/.test(word)) return word.slice(0, -1);
    return word;
}

/** Simple template interpolation with {{key}} syntax. */
function interpolate(template, data) {
    _assertStr(template, 'template');
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => (data[key] !== undefined ? data[key] : ''));
}

/** Generates a random string of given length. */
function randomString(len = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/** Generates a random alphabetical string. */
function randomAlpha(len = 8) { return randomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'); }

/** Generates a random hex string. */
function randomHex(len = 8) { return randomString(len, '0123456789abcdef'); }

/** Generates a random alphanumeric string. */
function randomAlphaNumeric(len = 8) { return randomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'); }

/** Splits string into chunks of n characters. */
function splitByLength(str, n) {
    _assertStr(str, 'str');
    const result = [];
    for (let i = 0; i < str.length; i += n) result.push(str.slice(i, i + n));
    return result;
}

/** Counts bytes of a UTF-8 string. */
function byteLength(str) {
    _assertStr(str, 'str');
    if (typeof Buffer !== 'undefined') return Buffer.byteLength(str, 'utf8');
    return new TextEncoder().encode(str).length;
}

module.exports = {
    capitalize, capitalizeWords, camelCase, snakeCase, kebabCase, pascalCase,
    titleCase, constantCase, dotCase, pathCase, swapCase,
    trim, trimStart, trimEnd, padStart, padEnd, padBoth,
    repeat, reverse, reverseWords,
    isPalindrome, isAnagram, startsWith, endsWith, includesStr, isBlank,
    countOccurrences, wordCount, charCount, lineCount, nthWord,
    extractEmails, extractUrls, extractHashtags, extractMentions, extractNumbers,
    replaceAll, stripHtml, escapeHtml, unescapeHtml, escapeRegex,
    slugify, deslugify, truncate, truncateWords, wrapText, indent, dedent,
    maskString, maskEmail, maskPhone, maskCreditCard,
    base64Encode, base64Decode, hexEncode, hexDecode, rot13, caesarCipher,
    levenshteinDistance, jaroWinkler, longestCommonPrefix, longestCommonSubstring,
    getInitials, abbreviate, humanize, ordinalize, pluralize, singularize,
    interpolate, randomString, randomAlpha, randomHex, randomAlphaNumeric,
    splitByLength, byteLength
};
