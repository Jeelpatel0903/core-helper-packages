/**
 * @module dom
 * @description DOM and browser environment utility functions — 30+ helpers.
 * ⚠️ These functions only work in browser environments (not Node.js).
 *    They safely no-op or return null when window/document is unavailable.
 */

'use strict';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// ─── Element Selection ────────────────────────────────────────────────────────

/** Gets element by selector. */
function getElement(selector) {
    if (!isBrowser) return null;
    return document.querySelector(selector);
}

/** Gets all elements matching selector. */
function getElements(selector) {
    if (!isBrowser) return [];
    return Array.from(document.querySelectorAll(selector));
}

/** Gets element by ID. */
function getElementById(id) {
    if (!isBrowser) return null;
    return document.getElementById(id);
}

// ─── Element Creation & Removal ──────────────────────────────────────────────

/**
 * Creates an element with attributes and children.
 * @param {string} tag - Tag name.
 * @param {Object} attrs - Attribute map.
 * @param {...(string|Element)} children - Child nodes.
 */
function createElement(tag, attrs = {}, ...children) {
    if (!isBrowser) return null;
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
        else el.setAttribute(k, v);
    });
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else if (child instanceof Element) el.appendChild(child);
    });
    return el;
}

/** Removes element from DOM. */
function removeElement(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

/** Replaces element with another. */
function replaceElement(oldEl, newEl) {
    if (oldEl && oldEl.parentNode) oldEl.parentNode.replaceChild(newEl, oldEl);
}

// ─── Class Manipulation ──────────────────────────────────────────────────────

/** Adds class(es) to element. */
function addClass(el, ...classes) { el && el.classList.add(...classes); }

/** Removes class(es) from element. */
function removeClass(el, ...classes) { el && el.classList.remove(...classes); }

/** Toggles class on element. */
function toggleClass(el, className, force) {
    if (el) force !== undefined ? el.classList.toggle(className, force) : el.classList.toggle(className);
}

/** Checks if element has class. */
function hasClass(el, className) { return el ? el.classList.contains(className) : false; }

// ─── Attribute Manipulation ──────────────────────────────────────────────────

/** Sets attribute on element. */
function setAttr(el, key, value) { el && el.setAttribute(key, value); }

/** Gets attribute from element. */
function getAttr(el, key) { return el ? el.getAttribute(key) : null; }

/** Removes attribute from element. */
function removeAttr(el, key) { el && el.removeAttribute(key); }

/** Checks if element has attribute. */
function hasAttr(el, key) { return el ? el.hasAttribute(key) : false; }

// ─── Style ───────────────────────────────────────────────────────────────────

/** Sets CSS property on element. */
function setCss(el, prop, value) { if (el) el.style[prop] = value; }

/** Gets computed CSS property of element. */
function getCss(el, prop) {
    if (!el || !isBrowser) return null;
    return window.getComputedStyle(el).getPropertyValue(prop);
}

/** Sets multiple CSS properties at once. */
function setCssMany(el, styles) { if (el) Object.assign(el.style, styles); }

// ─── Events ──────────────────────────────────────────────────────────────────

/** Adds event listener; returns cleanup function. */
function on(el, event, handler, options) {
    if (!el) return () => {};
    el.addEventListener(event, handler, options);
    return () => el.removeEventListener(event, handler, options);
}

/** Removes event listener. */
function off(el, event, handler) { el && el.removeEventListener(event, handler); }

/** Dispatches a custom event on element. */
function trigger(el, eventName, detail) {
    if (!el || !isBrowser) return;
    el.dispatchEvent(new CustomEvent(eventName, { bubbles: true, cancelable: true, detail }));
}

/** Adds one-time event listener. */
function once(el, event, handler) {
    if (!el) return;
    el.addEventListener(event, handler, { once: true });
}

// ─── Scroll ──────────────────────────────────────────────────────────────────

/** Scrolls to element smoothly. */
function scrollToElement(el, behavior = 'smooth') {
    el && el.scrollIntoView({ behavior, block: 'start' });
}

/** Scrolls to top of page. */
function scrollToTop(behavior = 'smooth') {
    if (isBrowser) window.scrollTo({ top: 0, behavior });
}

/** Gets current scroll position. */
function getScrollPosition() {
    if (!isBrowser) return { x: 0, y: 0 };
    return { x: window.pageXOffset || document.documentElement.scrollLeft, y: window.pageYOffset || document.documentElement.scrollTop };
}

/** Checks if element is visible in viewport. */
function isInViewport(el) {
    if (!el || !isBrowser) return false;
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}

// ─── Clipboard & Download ────────────────────────────────────────────────────

/** Copies text to clipboard. Returns a promise. */
function copyToClipboard(text) {
    if (!isBrowser) return Promise.reject(new Error('Not in browser'));
    if (navigator.clipboard) return navigator.clipboard.writeText(text);
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
}

/** Downloads content as a file. */
function downloadFile(content, filename, type = 'text/plain') {
    if (!isBrowser) return;
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ─── Query Params ─────────────────────────────────────────────────────────────

/** Gets all query params from current URL as object. */
function getQueryParams() {
    if (!isBrowser) return {};
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

/** Gets single query param by name. */
function getQueryParam(name) {
    if (!isBrowser) return null;
    return new URLSearchParams(window.location.search).get(name);
}

// ─── Cookies ─────────────────────────────────────────────────────────────────

/** Gets cookie value by name. */
function getCookie(name) {
    if (!isBrowser) return null;
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

/** Sets a cookie. */
function setCookie(name, value, days = 7, path = '/') {
    if (!isBrowser) return;
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path}`;
}

/** Removes a cookie. */
function removeCookie(name, path = '/') {
    if (!isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
}

// ─── localStorage ─────────────────────────────────────────────────────────────

/** Gets item from localStorage (auto-parses JSON). */
function lsGet(key) {
    if (!isBrowser) return null;
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return localStorage.getItem(key); }
}

/** Sets item in localStorage (auto-serializes JSON). */
function lsSet(key, value) { if (isBrowser) localStorage.setItem(key, JSON.stringify(value)); }

/** Removes item from localStorage. */
function lsRemove(key) { if (isBrowser) localStorage.removeItem(key); }

/** Clears all localStorage. */
function lsClear() { if (isBrowser) localStorage.clear(); }

// ─── Misc ─────────────────────────────────────────────────────────────────────

/** Gets current page title. */
function getTitle() { return isBrowser ? document.title : ''; }

/** Sets page title. */
function setTitle(title) { if (isBrowser) document.title = title; }

/** Checks if device is mobile. */
function isMobile() { return isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }

/** Gets viewport dimensions. */
function getViewport() {
    if (!isBrowser) return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
}

/** Checks if page is hidden (tab in background). */
function isPageHidden() { return isBrowser ? document.hidden : false; }

module.exports = {
    isBrowser,
    getElement, getElements, getElementById,
    createElement, removeElement, replaceElement,
    addClass, removeClass, toggleClass, hasClass,
    setAttr, getAttr, removeAttr, hasAttr,
    setCss, getCss, setCssMany,
    on, off, trigger, once,
    scrollToElement, scrollToTop, getScrollPosition, isInViewport,
    copyToClipboard, downloadFile,
    getQueryParams, getQueryParam,
    getCookie, setCookie, removeCookie,
    lsGet, lsSet, lsRemove, lsClear,
    getTitle, setTitle, isMobile, getViewport, isPageHidden
};
