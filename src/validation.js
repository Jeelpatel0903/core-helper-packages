/**
 * @module validation
 * @description Comprehensive validation utility functions — 55+ validators.
 */

'use strict';

// ─── Email & URLs ─────────────────────────────────────────────────────────────

/** Validates email address. */
function isEmail(val) {
    return typeof val === 'string' && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(val);
}

/** Validates URL (http/https). */
function isURL(val) {
    try { const u = new URL(val); return u.protocol === 'http:' || u.protocol === 'https:'; }
    catch { return false; }
}

/** Validates any URL (any protocol). */
function isAnyURL(val) {
    try { new URL(val); return true; }
    catch { return false; }
}

/** Validates GitHub URL. */
function isGitHubURL(val) { return isURL(val) && /^https?:\/\/(www\.)?github\.com\//.test(val); }

/** Validates YouTube URL. */
function isYouTubeURL(val) { return isURL(val) && /^https?:\/\/(www\.)?youtube\.com\/|youtu\.be\//.test(val); }

/** Validates Twitter/X URL. */
function isTwitterURL(val) { return isURL(val) && /^https?:\/\/(www\.)?(twitter|x)\.com\//.test(val); }

// ─── IP Addresses ─────────────────────────────────────────────────────────────

/** Validates IPv4 address. */
function isIPv4(val) {
    return typeof val === 'string' && /^(\d{1,3}\.){3}\d{1,3}$/.test(val) &&
        val.split('.').every(n => parseInt(n) <= 255);
}

/** Validates IPv6 address. */
function isIPv6(val) {
    return typeof val === 'string' && /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^::$|^::1$|^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/.test(val);
}

/** Validates IP address (v4 or v6). */
function isIP(val) { return isIPv4(val) || isIPv6(val); }

/** Validates MAC address. */
function isMACAddress(val) {
    return typeof val === 'string' && /^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$/.test(val);
}

// ─── Phone Numbers ────────────────────────────────────────────────────────────

/** Validates international phone number (E.164 format). */
function isPhone(val) {
    return typeof val === 'string' && /^\+?[1-9]\d{7,14}$/.test(val.replace(/[\s\-\(\)]/g, ''));
}

/** Validates Indian mobile number. */
function isIndianPhone(val) {
    return typeof val === 'string' && /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(val.replace(/\s/g, ''));
}

// ─── Card Numbers ─────────────────────────────────────────────────────────────

/** Validates credit card number using Luhn algorithm. */
function isCreditCard(val) {
    if (typeof val !== 'string') return false;
    const digits = val.replace(/[\s\-]/g, '');
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = parseInt(digits[i]);
        if (shouldDouble) { d *= 2; if (d > 9) d -= 9; }
        sum += d;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

/** Validates Visa card. */
function isVisa(val) { return typeof val === 'string' && /^4[\d]{12}(?:[\d]{3})?$/.test(val.replace(/\s/g, '')); }

/** Validates Mastercard. */
function isMastercard(val) { return typeof val === 'string' && /^5[1-5][\d]{14}$/.test(val.replace(/\s/g, '')); }

/** Validates American Express. */
function isAmex(val) { return typeof val === 'string' && /^3[47][\d]{13}$/.test(val.replace(/\s/g, '')); }

// ─── Identifiers ─────────────────────────────────────────────────────────────

/** Validates UUID (any version). */
function isUUID(val) {
    return typeof val === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}

/** Validates UUID v4. */
function isUUIDv4(val) {
    return typeof val === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
}

/** Validates ISBN-10. */
function isISBN10(val) {
    if (typeof val !== 'string') return false;
    const clean = val.replace(/[\-\s]/g, '');
    if (!/^\d{9}[\dX]$/.test(clean)) return false;
    const sum = clean.split('').reduce((s, c, i) => s + (c === 'X' ? 10 : parseInt(c)) * (10 - i), 0);
    return sum % 11 === 0;
}

/** Validates ISBN-13. */
function isISBN13(val) {
    if (typeof val !== 'string') return false;
    const clean = val.replace(/[\-\s]/g, '');
    if (!/^\d{13}$/.test(clean)) return false;
    const sum = clean.split('').reduce((s, c, i) => s + parseInt(c) * (i % 2 === 0 ? 1 : 3), 0);
    return sum % 10 === 0;
}

/** Validates ISBN (10 or 13). */
function isISBN(val) { return isISBN10(val) || isISBN13(val); }

/** Validates JWT token format. */
function isJWT(val) {
    return typeof val === 'string' && /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(val);
}

/** Validates semantic version string. */
function isSemver(val) {
    return typeof val === 'string' && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(val);
}

// ─── Character Class ──────────────────────────────────────────────────────────

/** Checks if string contains only letters. */
function isAlpha(val) { return typeof val === 'string' && /^[a-zA-Z]+$/.test(val); }

/** Checks if string contains only letters and digits. */
function isAlphaNumeric(val) { return typeof val === 'string' && /^[a-zA-Z0-9]+$/.test(val); }

/** Checks if string contains only digits. */
function isNumeric(val) { return typeof val === 'string' && /^\d+$/.test(val); }

/** Checks if string is valid hexadecimal. */
function isHex(val) { return typeof val === 'string' && /^[0-9a-fA-F]+$/.test(val); }

/** Validates URL-friendly slug. */
function isSlug(val) { return typeof val === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val); }

// ─── Color ────────────────────────────────────────────────────────────────────

/** Validates hex color (#RGB or #RRGGBB). */
function isHexColor(val) { return typeof val === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val); }

/** Validates RGB color string. */
function isRGB(val) { return typeof val === 'string' && /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(val); }

/** Validates RGBA color string. */
function isRGBA(val) { return typeof val === 'string' && /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(val); }

/** Validates HSL color string. */
function isHSL(val) { return typeof val === 'string' && /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(val); }

// ─── Geographic ───────────────────────────────────────────────────────────────

/** Validates latitude (-90 to 90). */
function isLatitude(val) { const n = Number(val); return !isNaN(n) && n >= -90 && n <= 90; }

/** Validates longitude (-180 to 180). */
function isLongitude(val) { const n = Number(val); return !isNaN(n) && n >= -180 && n <= 180; }

/** Validates lat/lng pair. */
function isLatLng(lat, lng) { return isLatitude(lat) && isLongitude(lng); }

/** Validates US ZIP code. */
function isZipCode(val) { return typeof val === 'string' && /^\d{5}(-\d{4})?$/.test(val); }

/** Validates Indian PIN code. */
function isIndianPincode(val) { return typeof val === 'string' && /^[1-9][0-9]{5}$/.test(val); }

// ─── Data Formats ────────────────────────────────────────────────────────────

/** Validates JSON string. */
function isJSON(val) {
    if (typeof val !== 'string') return false;
    try { JSON.parse(val); return true; } catch { return false; }
}

/** Validates Base64 string. */
function isBase64(val) { return typeof val === 'string' && /^[A-Za-z0-9+/]*={0,2}$/.test(val) && val.length % 4 === 0; }

/** Validates data URI. */
function isDataURI(val) { return typeof val === 'string' && /^data:[a-z]+\/[a-z0-9\-+]+;base64,/.test(val); }

/** Validates MIME type string. */
function isMIMEType(val) { return typeof val === 'string' && /^[a-z]+\/[a-z0-9\-+.]+$/.test(val); }

/** Validates MD5 hash. */
function isMD5(val) { return typeof val === 'string' && /^[a-f0-9]{32}$/i.test(val); }

/** Validates SHA-1 hash. */
function isSHA1(val) { return typeof val === 'string' && /^[a-f0-9]{40}$/i.test(val); }

/** Validates SHA-256 hash. */
function isSHA256(val) { return typeof val === 'string' && /^[a-f0-9]{64}$/i.test(val); }

/** Validates SHA-512 hash. */
function isSHA512(val) { return typeof val === 'string' && /^[a-f0-9]{128}$/i.test(val); }

// ─── Password & Username ──────────────────────────────────────────────────────

/**
 * Validates password strength.
 * Options: minLength (8), requireUppercase, requireLowercase, requireNumber, requireSpecial
 */
function isStrongPassword(val, options = {}) {
    const { minLength = 8, requireUppercase = true, requireLowercase = true, requireNumber = true, requireSpecial = true } = options;
    if (typeof val !== 'string' || val.length < minLength) return false;
    if (requireUppercase && !/[A-Z]/.test(val)) return false;
    if (requireLowercase && !/[a-z]/.test(val)) return false;
    if (requireNumber && !/\d/.test(val)) return false;
    if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(val)) return false;
    return true;
}

/** Gets password strength score 0–4. */
function passwordStrength(val) {
    if (typeof val !== 'string') return 0;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) score++;
    return score;
}

/** Validates username (3–20 chars, letters/numbers/underscore). */
function isUsername(val) { return typeof val === 'string' && /^[a-zA-Z0-9_]{3,20}$/.test(val); }

// ─── India-Specific ──────────────────────────────────────────────────────────

/** Validates Indian PAN card number. */
function isPAN(val) { return typeof val === 'string' && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val); }

/** Validates Indian Aadhaar number (12 digits). */
function isAadhaar(val) {
    if (typeof val !== 'string') return false;
    const clean = val.replace(/\s/g, '');
    return /^\d{12}$/.test(clean) && clean[0] !== '0' && clean[0] !== '1';
}

/** Validates Indian GSTIN. */
function isGSTIN(val) { return typeof val === 'string' && /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(val); }

/** Validates Indian IFSC code. */
function isIFSC(val) { return typeof val === 'string' && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val); }

// ─── Finance ─────────────────────────────────────────────────────────────────

/** Validates IBAN. */
function isIBAN(val) {
    if (typeof val !== 'string') return false;
    const clean = val.replace(/\s/g, '').toUpperCase();
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{4,}$/.test(clean)) return false;
    const rearranged = clean.slice(4) + clean.slice(0, 4);
    const num = rearranged.split('').map(c => isNaN(c) ? (c.charCodeAt(0) - 55).toString() : c).join('');
    let remainder = 0;
    for (const chunk of num.match(/.{1,9}/g)) remainder = parseInt(remainder + chunk) % 97;
    return remainder === 1;
}

/** Validates BIC/SWIFT code. */
function isBIC(val) { return typeof val === 'string' && /^[A-Z]{6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$/.test(val); }

// ─── Other ────────────────────────────────────────────────────────────────────

/** Validates cron expression (5-field). */
function isCronExpression(val) {
    return typeof val === 'string' && /^(\*|([0-5]?\d))(\/\d+)?(\s(\*|([01]?\d|2[0-3]))(\/\d+)?){4}$/.test(val);
}

/** Validates VIN (Vehicle Identification Number). */
function isVIN(val) {
    return typeof val === 'string' && /^[A-HJ-NPR-Z0-9]{17}$/.test(val.toUpperCase());
}

/** Validates EAN-13 barcode. */
function isEAN13(val) {
    if (typeof val !== 'string' || !/^\d{13}$/.test(val)) return false;
    const sum = val.split('').reduce((s, c, i) => s + parseInt(c) * (i % 2 === 0 ? 1 : 3), 0);
    return sum % 10 === 0;
}

module.exports = {
    isEmail, isURL, isAnyURL, isGitHubURL, isYouTubeURL, isTwitterURL,
    isIPv4, isIPv6, isIP, isMACAddress,
    isPhone, isIndianPhone,
    isCreditCard, isVisa, isMastercard, isAmex,
    isUUID, isUUIDv4, isISBN, isISBN10, isISBN13, isJWT, isSemver,
    isAlpha, isAlphaNumeric, isNumeric, isHex, isSlug,
    isHexColor, isRGB, isRGBA, isHSL,
    isLatitude, isLongitude, isLatLng, isZipCode, isIndianPincode,
    isJSON, isBase64, isDataURI, isMIMEType, isMD5, isSHA1, isSHA256, isSHA512,
    isStrongPassword, passwordStrength, isUsername,
    isPAN, isAadhaar, isGSTIN, isIFSC,
    isIBAN, isBIC, isCronExpression, isVIN, isEAN13
};
