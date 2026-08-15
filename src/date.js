/**
 * @module date
 * @description Comprehensive date/time utility functions — 75+ helpers. Zero dependencies.
 */

'use strict';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _toDate(val) {
    if (val instanceof Date) return val;
    const d = new Date(val);
    if (isNaN(d.getTime())) throw new TypeError(`Cannot parse date: ${val}`);
    return d;
}
function _copy(d) { return new Date(d.getTime()); }

// ─── Current Time ────────────────────────────────────────────────────────────

/** Returns current Date object. */
function now() { return new Date(); }

/** Returns today's date at midnight (local). */
function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }

/** Returns yesterday's date at midnight. */
function yesterday() { const d = today(); d.setDate(d.getDate() - 1); return d; }

/** Returns tomorrow's date at midnight. */
function tomorrow() { const d = today(); d.setDate(d.getDate() + 1); return d; }

/** Returns current UTC Date. */
function utcNow() { const d = new Date(); return new Date(d.toISOString()); }

// ─── Parse & Format ──────────────────────────────────────────────────────────

/** Parses a date string or timestamp. */
function parseDate(val) { return _toDate(val); }

/**
 * Formats date with tokens: YYYY MM DD HH mm ss.
 * @example formatDate(new Date(), 'YYYY-MM-DD')
 */
function formatDate(date, formatStr = 'YYYY-MM-DD') {
    const d = _toDate(date);
    const pad = n => String(n).padStart(2, '0');
    return formatStr
        .replace('YYYY', d.getFullYear())
        .replace('YY', String(d.getFullYear()).slice(-2))
        .replace('MM', pad(d.getMonth() + 1))
        .replace('DD', pad(d.getDate()))
        .replace('HH', pad(d.getHours()))
        .replace('mm', pad(d.getMinutes()))
        .replace('ss', pad(d.getSeconds()))
        .replace('SSS', String(d.getMilliseconds()).padStart(3, '0'));
}

/** Formats date to ISO 8601 string. */
function formatDateISO(date) { return _toDate(date).toISOString(); }

/** Formats date using Intl.DateTimeFormat. */
function formatDateLocale(date, locale = 'en-US', options = {}) {
    return new Intl.DateTimeFormat(locale, options).format(_toDate(date));
}

/** Formats time as HH:mm:ss. */
function formatTime(date) { return formatDate(date, 'HH:mm:ss'); }

/** Formats date and time. */
function formatDateTime(date) { return formatDate(date, 'YYYY-MM-DD HH:mm:ss'); }

/** Returns relative time string (e.g. "2 hours ago", "in 3 days"). */
function formatRelative(date) {
    const d = _toDate(date);
    const diff = d.getTime() - Date.now();
    const abs = Math.abs(diff);
    const past = diff < 0;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (abs < 1000 * 60) return rtf.format(Math.round(diff / 1000), 'second');
    if (abs < 1000 * 60 * 60) return rtf.format(Math.round(diff / (1000 * 60)), 'minute');
    if (abs < 1000 * 60 * 60 * 24) return rtf.format(Math.round(diff / (1000 * 60 * 60)), 'hour');
    if (abs < 1000 * 60 * 60 * 24 * 7) return rtf.format(Math.round(diff / (1000 * 60 * 60 * 24)), 'day');
    if (abs < 1000 * 60 * 60 * 24 * 30) return rtf.format(Math.round(diff / (1000 * 60 * 60 * 24 * 7)), 'week');
    if (abs < 1000 * 60 * 60 * 24 * 365) return rtf.format(Math.round(diff / (1000 * 60 * 60 * 24 * 30)), 'month');
    return rtf.format(Math.round(diff / (1000 * 60 * 60 * 24 * 365)), 'year');
}

/** Formats duration in ms to human-readable string. */
function formatDuration(ms) {
    const absMs = Math.abs(ms);
    const h = Math.floor(absMs / 3600000);
    const m = Math.floor((absMs % 3600000) / 60000);
    const s = Math.floor((absMs % 60000) / 1000);
    const parts = [];
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    if (s || !parts.length) parts.push(`${s}s`);
    return (ms < 0 ? '-' : '') + parts.join(' ');
}

/** Alias for formatRelative — "time ago" format. */
function timeAgo(date) { return formatRelative(date); }

// ─── Add / Subtract ──────────────────────────────────────────────────────────

function _add(date, value, unit) {
    const d = _copy(_toDate(date));
    switch (unit) {
        case 'ms':      d.setMilliseconds(d.getMilliseconds() + value); break;
        case 'second':  d.setSeconds(d.getSeconds() + value); break;
        case 'minute':  d.setMinutes(d.getMinutes() + value); break;
        case 'hour':    d.setHours(d.getHours() + value); break;
        case 'day':     d.setDate(d.getDate() + value); break;
        case 'week':    d.setDate(d.getDate() + value * 7); break;
        case 'month':   d.setMonth(d.getMonth() + value); break;
        case 'year':    d.setFullYear(d.getFullYear() + value); break;
    }
    return d;
}

/** Adds milliseconds. */
function addMilliseconds(date, n) { return _add(date, n, 'ms'); }
/** Adds seconds. */
function addSeconds(date, n) { return _add(date, n, 'second'); }
/** Adds minutes. */
function addMinutes(date, n) { return _add(date, n, 'minute'); }
/** Adds hours. */
function addHours(date, n) { return _add(date, n, 'hour'); }
/** Adds days. */
function addDays(date, n) { return _add(date, n, 'day'); }
/** Adds weeks. */
function addWeeks(date, n) { return _add(date, n, 'week'); }
/** Adds months. */
function addMonths(date, n) { return _add(date, n, 'month'); }
/** Adds years. */
function addYears(date, n) { return _add(date, n, 'year'); }

/** Subtracts milliseconds. */
function subMilliseconds(date, n) { return _add(date, -n, 'ms'); }
/** Subtracts seconds. */
function subSeconds(date, n) { return _add(date, -n, 'second'); }
/** Subtracts minutes. */
function subMinutes(date, n) { return _add(date, -n, 'minute'); }
/** Subtracts hours. */
function subHours(date, n) { return _add(date, -n, 'hour'); }
/** Subtracts days. */
function subDays(date, n) { return _add(date, -n, 'day'); }
/** Subtracts weeks. */
function subWeeks(date, n) { return _add(date, -n, 'week'); }
/** Subtracts months. */
function subMonths(date, n) { return _add(date, -n, 'month'); }
/** Subtracts years. */
function subYears(date, n) { return _add(date, -n, 'year'); }

// ─── Diff ─────────────────────────────────────────────────────────────────────

function _diff(a, b, unit) {
    const da = _toDate(a), db = _toDate(b);
    const ms = db.getTime() - da.getTime();
    switch (unit) {
        case 'ms':      return ms;
        case 'second':  return Math.floor(ms / 1000);
        case 'minute':  return Math.floor(ms / 60000);
        case 'hour':    return Math.floor(ms / 3600000);
        case 'day':     return Math.floor(ms / 86400000);
        case 'week':    return Math.floor(ms / (86400000 * 7));
        case 'month':   return (db.getFullYear() - da.getFullYear()) * 12 + (db.getMonth() - da.getMonth());
        case 'year':    return db.getFullYear() - da.getFullYear();
    }
}

/** Milliseconds between two dates. */
function diffMs(a, b) { return _diff(a, b, 'ms'); }
/** Seconds between two dates. */
function diffSeconds(a, b) { return _diff(a, b, 'second'); }
/** Minutes between two dates. */
function diffMinutes(a, b) { return _diff(a, b, 'minute'); }
/** Hours between two dates. */
function diffHours(a, b) { return _diff(a, b, 'hour'); }
/** Days between two dates. */
function diffDays(a, b) { return _diff(a, b, 'day'); }
/** Weeks between two dates. */
function diffWeeks(a, b) { return _diff(a, b, 'week'); }
/** Months between two dates. */
function diffMonths(a, b) { return _diff(a, b, 'month'); }
/** Years between two dates. */
function diffYears(a, b) { return _diff(a, b, 'year'); }

// ─── Start / End Of ──────────────────────────────────────────────────────────

/** Start of day (midnight). */
function startOfDay(date) { const d = _copy(_toDate(date)); d.setHours(0, 0, 0, 0); return d; }
/** End of day (23:59:59.999). */
function endOfDay(date) { const d = _copy(_toDate(date)); d.setHours(23, 59, 59, 999); return d; }

/** Start of week (Sunday). */
function startOfWeek(date) {
    const d = _copy(_toDate(date));
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
}
/** End of week (Saturday). */
function endOfWeek(date) {
    const d = _copy(_toDate(date));
    d.setDate(d.getDate() + (6 - d.getDay()));
    d.setHours(23, 59, 59, 999);
    return d;
}

/** Start of month. */
function startOfMonth(date) { const d = _copy(_toDate(date)); d.setDate(1); d.setHours(0, 0, 0, 0); return d; }
/** End of month. */
function endOfMonth(date) {
    const d = _copy(_toDate(date));
    d.setMonth(d.getMonth() + 1, 0);
    d.setHours(23, 59, 59, 999);
    return d;
}

/** Start of year. */
function startOfYear(date) { const d = _copy(_toDate(date)); d.setMonth(0, 1); d.setHours(0, 0, 0, 0); return d; }
/** End of year. */
function endOfYear(date) { const d = _copy(_toDate(date)); d.setMonth(11, 31); d.setHours(23, 59, 59, 999); return d; }

/** Start of hour. */
function startOfHour(date) { const d = _copy(_toDate(date)); d.setMinutes(0, 0, 0); return d; }
/** End of hour. */
function endOfHour(date) { const d = _copy(_toDate(date)); d.setMinutes(59, 59, 999); return d; }

/** Start of minute. */
function startOfMinute(date) { const d = _copy(_toDate(date)); d.setSeconds(0, 0); return d; }
/** End of minute. */
function endOfMinute(date) { const d = _copy(_toDate(date)); d.setSeconds(59, 999); return d; }

// ─── Boolean Checks ──────────────────────────────────────────────────────────

/** Checks if date is today. */
function isToday(date) { return isSameDay(date, new Date()); }
/** Checks if date is yesterday. */
function isYesterday(date) { return isSameDay(date, yesterday()); }
/** Checks if date is tomorrow. */
function isTomorrow(date) { return isSameDay(date, tomorrow()); }

/** Checks if date is a weekend (Sat/Sun). */
function isWeekend(date) { const day = _toDate(date).getDay(); return day === 0 || day === 6; }
/** Checks if date is a weekday. */
function isWeekday(date) { return !isWeekend(date); }

/** Checks if year is a leap year. */
function isLeapYear(dateOrYear) {
    const y = dateOrYear instanceof Date ? dateOrYear.getFullYear() : dateOrYear;
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** Checks if date a is before date b. */
function isBefore(a, b) { return _toDate(a).getTime() < _toDate(b).getTime(); }
/** Checks if date a is after date b. */
function isAfter(a, b) { return _toDate(a).getTime() > _toDate(b).getTime(); }

/** Checks if date is between start and end (inclusive). */
function isBetween(date, start, end) {
    const t = _toDate(date).getTime();
    return t >= _toDate(start).getTime() && t <= _toDate(end).getTime();
}

/** Checks if two dates are the same calendar day. */
function isSameDay(a, b) { const da = _toDate(a), db = _toDate(b); return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate(); }
/** Checks if two dates are in the same month. */
function isSameMonth(a, b) { const da = _toDate(a), db = _toDate(b); return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth(); }
/** Checks if two dates are in the same year. */
function isSameYear(a, b) { return _toDate(a).getFullYear() === _toDate(b).getFullYear(); }

// ─── Get Parts ───────────────────────────────────────────────────────────────

/** Gets day of week name. */
function getDayName(date, locale = 'en-US') {
    return _toDate(date).toLocaleDateString(locale, { weekday: 'long' });
}

/** Gets month name. */
function getMonthName(date, locale = 'en-US') {
    return _toDate(date).toLocaleDateString(locale, { month: 'long' });
}

/** Gets week number of the year (ISO). */
function getWeekOfYear(date) {
    const d = _toDate(date);
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
}

/** Gets day of year (1–365/366). */
function getDayOfYear(date) {
    const d = _toDate(date);
    return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}

/** Gets quarter (1–4). */
function getQuarter(date) { return Math.ceil((_toDate(date).getMonth() + 1) / 3); }

/** Gets number of days in the month of a date. */
function getDaysInMonth(date) {
    const d = _toDate(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/** Gets number of days in the year. */
function getDaysInYear(date) { return isLeapYear(date) ? 366 : 365; }

// ─── Unix Timestamp ──────────────────────────────────────────────────────────

/** Converts date to Unix timestamp (seconds). */
function toUnixTimestamp(date) { return Math.floor(_toDate(date).getTime() / 1000); }

/** Creates Date from Unix timestamp. */
function fromUnixTimestamp(ts) { return new Date(ts * 1000); }

/** Converts date to milliseconds since epoch. */
function toMilliseconds(date) { return _toDate(date).getTime(); }

/** Creates Date from milliseconds. */
function fromMilliseconds(ms) { return new Date(ms); }

// ─── Countdown ───────────────────────────────────────────────────────────────

/** Returns countdown object {days, hours, minutes, seconds} to a future date. */
function countdown(date) {
    const ms = Math.max(0, _toDate(date).getTime() - Date.now());
    return {
        total: ms,
        days:    Math.floor(ms / 86400000),
        hours:   Math.floor((ms % 86400000) / 3600000),
        minutes: Math.floor((ms % 3600000) / 60000),
        seconds: Math.floor((ms % 60000) / 1000)
    };
}

/** Creates an array of dates between start and end. */
function dateRange(start, end, step = 'day') {
    const dates = [];
    let cur = _toDate(start);
    const endDate = _toDate(end);
    while (cur <= endDate) {
        dates.push(_copy(cur));
        cur = _add(cur, 1, step);
    }
    return dates;
}

/** Returns the minimum (earliest) date from array. */
function minDate(...dates) {
    return dates.map(_toDate).reduce((a, b) => a < b ? a : b);
}

/** Returns the maximum (latest) date from array. */
function maxDate(...dates) {
    return dates.map(_toDate).reduce((a, b) => a > b ? a : b);
}

module.exports = {
    now, today, yesterday, tomorrow, utcNow,
    parseDate, formatDate, formatDateISO, formatDateLocale, formatTime,
    formatDateTime, formatRelative, formatDuration, timeAgo,
    addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, addMonths, addYears,
    subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks, subMonths, subYears,
    diffMs, diffSeconds, diffMinutes, diffHours, diffDays, diffWeeks, diffMonths, diffYears,
    startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
    startOfYear, endOfYear, startOfHour, endOfHour, startOfMinute, endOfMinute,
    isToday, isYesterday, isTomorrow, isWeekend, isWeekday, isLeapYear,
    isBefore, isAfter, isBetween, isSameDay, isSameMonth, isSameYear,
    getDayName, getMonthName, getWeekOfYear, getDayOfYear,
    getQuarter, getDaysInMonth, getDaysInYear,
    toUnixTimestamp, fromUnixTimestamp, toMilliseconds, fromMilliseconds,
    countdown, dateRange, minDate, maxDate
};
