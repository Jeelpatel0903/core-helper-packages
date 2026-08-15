/**
 * @module color
 * @description Comprehensive color manipulation utilities — 30+ helpers.
 */

'use strict';

// ─── Parsing ─────────────────────────────────────────────────────────────────

/** Parses "#RGB" or "#RRGGBB" to {r, g, b}. */
function hexToRgb(hex) {
    if (typeof hex !== 'string') throw new TypeError('Expected a string');
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    if (clean.length !== 6) throw new Error(`Invalid hex color: ${hex}`);
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16)
    };
}

/** Converts {r, g, b} to "#RRGGBB" hex string. */
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(n => Math.round(n).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** Converts hex to HSL object {h, s, l}. */
function hexToHsl(hex) { return rgbToHsl(...Object.values(hexToRgb(hex))); }

/** Converts HSL to hex. */
function hslToHex(h, s, l) { return rgbToHex(...Object.values(hslToRgb(h, s, l))); }

/** Converts hex to RGBA string. */
function hexToRgba(hex, alpha = 1) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Converts {r, g, b} to {h, s, l}. */
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/** Converts {h, s, l} to {r, g, b}. */
function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

/** Converts {r, g, b} to HSV {h, s, v}. */
function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0, s = max === 0 ? 0 : d / max, v = max;
    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

// ─── Manipulation ─────────────────────────────────────────────────────────────

/** Darkens a hex color by amount (0–100). */
function darken(hex, amount = 10) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(h, s, Math.max(0, l - amount));
}

/** Lightens a hex color by amount (0–100). */
function lighten(hex, amount = 10) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(h, s, Math.min(100, l + amount));
}

/** Saturates a hex color. */
function saturate(hex, amount = 10) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(h, Math.min(100, s + amount), l);
}

/** Desaturates a hex color. */
function desaturate(hex, amount = 10) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(h, Math.max(0, s - amount), l);
}

/** Converts hex color to grayscale. */
function grayscale(hex) {
    const { r, g, b } = hexToRgb(hex);
    const gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    return rgbToHex(gray, gray, gray);
}

/** Inverts a hex color. */
function invertColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}

/** Mixes two hex colors with a given weight (0–1). */
function mixColors(hex1, hex2, weight = 0.5) {
    const c1 = hexToRgb(hex1), c2 = hexToRgb(hex2);
    return rgbToHex(
        Math.round(c1.r * weight + c2.r * (1 - weight)),
        Math.round(c1.g * weight + c2.g * (1 - weight)),
        Math.round(c1.b * weight + c2.b * (1 - weight))
    );
}

/** Returns complementary color (opposite on color wheel). */
function complementary(hex) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex((h + 180) % 360, s, l);
}

/** Returns array of analogous colors [left, center, right]. */
function analogous(hex, angle = 30) {
    const { h, s, l } = hexToHsl(hex);
    return [
        hslToHex((h - angle + 360) % 360, s, l),
        hex,
        hslToHex((h + angle) % 360, s, l)
    ];
}

/** Returns triadic colors [color1, color2, color3]. */
function triadic(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
}

/** Returns tetradic (square) colors [4 colors]. */
function tetradic(hex) {
    const { h, s, l } = hexToHsl(hex);
    return [0, 90, 180, 270].map(offset => hslToHex((h + offset) % 360, s, l));
}

/** Returns split-complementary colors. */
function splitComplementary(hex, angle = 150) {
    const { h, s, l } = hexToHsl(hex);
    return [hex, hslToHex((h + angle) % 360, s, l), hslToHex((h - angle + 360) % 360, s, l)];
}

// ─── Contrast & Accessibility ────────────────────────────────────────────────

/** Calculates relative luminance of an RGB color. */
function getLuminance(r, g, b) {
    const [R, G, B] = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** Gets WCAG contrast ratio between two hex colors. */
function getContrastRatio(hex1, hex2) {
    const { r: r1, g: g1, b: b1 } = hexToRgb(hex1);
    const { r: r2, g: g2, b: b2 } = hexToRgb(hex2);
    const l1 = getLuminance(r1, g1, b1), l2 = getLuminance(r2, g2, b2);
    const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

/** Checks if color is light (luminance > 0.5). */
function isLightColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    return getLuminance(r, g, b) > 0.5;
}

/** Checks if color is dark. */
function isDarkColor(hex) { return !isLightColor(hex); }

/** Returns black or white text color for best contrast on background. */
function bestTextColor(bgHex) { return isLightColor(bgHex) ? '#000000' : '#FFFFFF'; }

// ─── Generators ──────────────────────────────────────────────────────────────

/** Generates a random hex color. */
function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
}

/** Generates a random pastel color. */
function randomPastel() {
    const h = Math.floor(Math.random() * 360);
    return hslToHex(h, 60, 80);
}

/** Generates an array of n evenly spaced hue colors. */
function colorPalette(n, s = 70, l = 50) {
    return Array.from({ length: n }, (_, i) => hslToHex(Math.round((360 / n) * i), s, l));
}

/** Parses any CSS color string to {r, g, b, a}. */
function parseColor(str) {
    if (str.startsWith('#')) { const { r, g, b } = hexToRgb(str); return { r, g, b, a: 1 }; }
    const rgba = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgba) return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] !== undefined ? +rgba[4] : 1 };
    throw new Error(`Cannot parse color: ${str}`);
}

/** Converts any CSS color to hex. */
function toHexColor(str) {
    const { r, g, b } = parseColor(str);
    return rgbToHex(r, g, b);
}

module.exports = {
    hexToRgb, rgbToHex, hexToHsl, hslToHex, hexToRgba,
    rgbToHsl, hslToRgb, rgbToHsv,
    darken, lighten, saturate, desaturate, grayscale, invertColor,
    mixColors, complementary, analogous, triadic, tetradic, splitComplementary,
    getLuminance, getContrastRatio, isLightColor, isDarkColor, bestTextColor,
    randomColor, randomPastel, colorPalette, parseColor, toHexColor
};
