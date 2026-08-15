# Core Helper Packages

> 🚀 A comprehensive all-in-one JavaScript utility library with **572+ functions** across 11 modules.  
> Zero dependencies. Works in Node.js, browsers, Angular, React, Vue, TypeScript, and plain JS.

[![npm version](https://img.shields.io/badge/npm-v2.0.0-blue)](https://www.npmjs.com/package/core-helper-packages)
[![license](https://img.shields.io/badge/license-ISC-green)](LICENSE)
[![zero-deps](https://img.shields.io/badge/dependencies-zero-brightgreen)](package.json)

---

## 📦 Installation

```bash
npm install core-helper-packages
```

---

## 🔌 Usage

### CommonJS (Node.js)
```javascript
const h = require('core-helper-packages');
// or import only what you need:
const { isEmail, formatDate, debounce } = require('core-helper-packages');
```

### ES Modules
```javascript
import * as h from 'core-helper-packages';
import { slugify, hexToRgb, median } from 'core-helper-packages';
```

### TypeScript / Angular / React
```typescript
import { isEmail, formatDate, cloneDeep, debounce } from 'core-helper-packages';
// Full TypeScript types included out of the box!
```

### Import specific modules
```javascript
const arrayUtils   = require('core-helper-packages/array');
const stringUtils  = require('core-helper-packages/string');
const dateUtils    = require('core-helper-packages/date');
const validation   = require('core-helper-packages/validation');
const colorUtils   = require('core-helper-packages/color');
const asyncUtils   = require('core-helper-packages/async');
const numberUtils  = require('core-helper-packages/number');
const objectUtils  = require('core-helper-packages/object');
const funcUtils    = require('core-helper-packages/function');
const domUtils     = require('core-helper-packages/dom');
const typeUtils    = require('core-helper-packages/type');
```

---

## 📚 Module Overview

| Module | Functions | Description |
|--------|:---------:|-------------|
| `type` | 44 | Type checking utilities |
| `array` | 87 | Array manipulation |
| `string` | 75 | String transformation |
| `number` | 72 | Math & unit conversions |
| `object` | 44 | Object utilities |
| `date` | 77 | Date/time (zero-dep, like date-fns!) |
| `validation` | 57 | Email, URL, phone, PAN, Aadhaar… |
| `function` | 29 | Debounce, memoize, curry, pipe… |
| `color` | 30 | Hex/RGB/HSL conversions + more |
| `async` | 22 | Promise utilities |
| `dom` | 41 | Browser/DOM utilities |
| **Total** | **572** | |

---

## 🔍 Type Utilities (44 functions)

```javascript
const { isString, isNumber, isDeepEqual, isEmpty, typeOf } = require('core-helper-packages');

isString('hello')            // true
isNumber(42)                 // true
isDeepEqual({a:1},{a:1})     // true
isEmpty([])                  // true
isEmpty({})                  // true
typeOf([])                   // 'array'
typeOf(null)                 // 'null'

isInteger(3.0)               // true
isFloat(3.14)                // true
isEven(4)                    // true
isOdd(7)                     // true
isPositive(5)                // true
isPrimitive('str')           // true
isPlainObject({})            // true
isIterable([1,2,3])          // true
```

**All type functions:** `isString`, `isNumber`, `isBoolean`, `isObject`, `isFunction`, `isArray`, `isNull`, `isUndefined`, `isNullOrUndefined`, `isInteger`, `isFloat`, `isNaN`, `isFinite`, `isDate`, `isRegExp`, `isSymbol`, `isBigInt`, `isMap`, `isSet`, `isWeakMap`, `isWeakSet`, `isPromise`, `isError`, `isArrayBuffer`, `isTypedArray`, `isGeneratorFunction`, `isPlainObject`, `isIterable`, `isAsyncFunction`, `isEmpty`, `isTruthy`, `isFalsy`, `isEqual`, `isDeepEqual`, `isPrimitive`, `isObjectLike`, `isNonEmptyString`, `isPositive`, `isNegative`, `isZero`, `isSafeInteger`, `isEven`, `isOdd`, `typeOf`

---

## 🗃️ Array Utilities (87 functions)

```javascript
const { chunkArray, groupBy, median, shuffle, permutations, zipObject } = require('core-helper-packages');

// Statistics
median([1,2,3,4,5])                   // 3
mode([1,1,2,3,3])                     // [1, 3]
variance([2,4,6])                     // 2.666...
standardDeviation([2,4,6])            // 1.633...
percentile([1,2,3,4,5], 75)           // 4

// Grouping & Counting
groupBy([1,2,3,4], x => x%2===0 ? 'even' : 'odd')
// { odd: [1,3], even: [2,4] }

partition([1,2,3,4,5], x => x > 3)
// [[4,5], [1,2,3]]

countBy(['a','b','a','c'], x => x)
// { a: 2, b: 1, c: 1 }

// Transform
chunkArray([1,2,3,4,5], 2)            // [[1,2],[3,4],[5]]
rotate([1,2,3,4,5], 2)               // [3,4,5,1,2]
toMatrix([1,2,3,4,5,6], 3)           // [[1,2,3],[4,5,6]]
matrixTranspose([[1,2],[3,4]])        // [[1,3],[2,4]]

// Set operations
intersectArray([1,2,3], [2,3,4])     // [2,3]
unionArray([1,2], [2,3])             // [1,2,3]
differenceArray([1,2,3], [2])        // [1,3]
symmetricDifference([1,2,3],[2,3,4]) // [1,4]

// Combinatorics
combinations([1,2,3], 2)             // [[1,2],[1,3],[2,3]]
permutations([1,2,3])                // 6 permutations
powerSet([1,2])                      // [[],[1],[2],[1,2]]
cartesianProduct([1,2],['a','b'])    // [[1,'a'],[1,'b'],[2,'a'],[2,'b']]

// Moving stats
cumSum([1,2,3,4])                    // [1,3,6,10]
movingAverage([1,2,3,4,5], 3)        // [1, 1.5, 2, 3, 4]

// Zip & pair
zipArray([1,2], ['a','b'])           // [[1,'a'],[2,'b']]
zipObject(['a','b'], [1,2])          // { a:1, b:2 }
```

---

## 🔤 String Utilities (75 functions)

```javascript
const { camelCase, slugify, levenshteinDistance, maskEmail } = require('core-helper-packages');

// Case conversion
camelCase('hello world')             // 'helloWorld'
snakeCase('helloWorld')              // 'hello_world'
kebabCase('Hello World')             // 'hello-world'
pascalCase('hello world')            // 'HelloWorld'
constantCase('helloWorld')           // 'HELLO_WORLD'

// Transform
slugify('Hello World! 2026')         // 'hello-world-2026'
truncate('Long text here', 8)        // 'Long ...'
wrapText('word1 word2 word3', 10)    // wrapped text

// Masking (for PII)
maskEmail('jeel@example.com')        // 'je***@example.com'
maskPhone('+919876543210')           // '*******3210'
maskCreditCard('4111111111111111')   // '************1111'

// Similarity & distance
levenshteinDistance('kitten','sitting') // 3
jaroWinkler('MARTHA','MARHTA')          // 0.961...
isAnagram('listen','silent')            // true

// Extract
extractEmails('email me at foo@bar.com please')   // ['foo@bar.com']
extractHashtags('#hello world #test')             // ['#hello','#test']
extractNumbers('I have 3 cats and 2 dogs')        // [3, 2]

// Encode / Cipher
base64Encode('hello')                // 'aGVsbG8='
rot13('Hello')                       // 'Uryyb'
caesarCipher('Hello', 3)             // 'Khoor'

// Format
pluralize('cat', 2)                  // 'cats'
ordinalize(3)                        // '3rd'
humanize('helloWorld')               // 'Hello world'
interpolate('Hi {{name}}!', {name:'Jeel'}) // 'Hi Jeel!'
```

---

## 🔢 Number Utilities (72 functions)

```javascript
const { clamp, fibonacci, formatBytes, celsiusToFahrenheit } = require('core-helper-packages');

// Math
clamp(15, 0, 10)                     // 10
fibonacci(10)                        // 55
factorial(5)                         // 120
gcd(12, 8)                           // 4
lcm(4, 6)                            // 12
isPrime(17)                          // true
primesUpTo(20)                       // [2,3,5,7,11,13,17,19]
digitSum(1234)                       // 10

// Format
formatNumber(1234567)                // '1,234,567'
formatCurrency(99.99, 'INR', 'en-IN') // '₹99.99'
formatBytes(1073741824)              // '1 GB'
formatPercent(75.5)                  // '75.50%'

// Unit conversions
celsiusToFahrenheit(100)             // 212
kmToMiles(100)                       // 62.1371
kgToLbs(70)                         // 154.324
metersToFeet(10)                     // 32.8084
degreesToRadians(180)                // 3.14159...

// Base conversion
toBinary(255)                        // 'FF'
toHex(255)                           // 'FF'
convertBase('FF', 16, 10)            // '255'

// Range
mapRange(5, 0, 10, 0, 100)           // 50
normalize(5, 0, 10)                  // 0.5
```

---

## 📦 Object Utilities (44 functions)

```javascript
const { pick, cloneDeep, mergeDeep, flattenObject } = require('core-helper-packages');

// Pick & Omit
pick({a:1,b:2,c:3}, ['a','c'])       // {a:1, c:3}
omit({a:1,b:2,c:3}, ['b'])           // {a:1, c:3}
pickBy({a:1,b:2,c:3}, v => v > 1)   // {b:2, c:3}

// Deep access
get({a:{b:{c:42}}}, 'a.b.c')        // 42
set({}, 'a.b.c', 42)                // {a:{b:{c:42}}}
has({a:{b:1}}, 'a.b')               // true

// Deep merge & clone
mergeDeep({a:1,b:{x:1}}, {b:{y:2}}) // {a:1, b:{x:1,y:2}}
cloneDeep({a:{b:[1,2,3]}})           // deep copy

// Flatten/Unflatten
flattenObject({a:{b:{c:1}}})         // {'a.b.c': 1}
unflattenObject({'a.b.c': 1})        // {a:{b:{c:1}}}

// Transform
mapValues({a:1,b:2}, v => v*2)      // {a:2, b:4}
mapKeys({a:1}, k => k.toUpperCase())// {A:1}
invert({a:'x', b:'y'})              // {x:'a', y:'b'}
renameKey({a:1}, 'a', 'z')          // {z:1}

// Query string
toQueryString({name:'Jeel',age:22}) // 'name=Jeel&age=22'
fromQueryString('name=Jeel&age=22') // {name:'Jeel', age:'22'}
```

---

## 📅 Date/Time Utilities (77 functions)

```javascript
const { formatDate, addDays, diffDays, timeAgo, countdown } = require('core-helper-packages');

// Formatting (like date-fns, zero dependencies!)
formatDate(new Date(), 'YYYY-MM-DD')          // '2026-08-15'
formatDate(new Date(), 'DD/MM/YYYY HH:mm')    // '15/08/2026 12:04'
formatRelative(new Date(Date.now()-3600000))  // '1 hour ago'
formatDuration(3723000)                        // '1h 2m 3s'
timeAgo(new Date('2026-01-01'))               // '7 months ago'

// Add/Subtract
addDays(new Date(), 30)                       // 30 days from now
subMonths(new Date(), 3)                      // 3 months ago
addHours(new Date(), 2)                       // 2 hours later

// Diff
diffDays(new Date('2026-01-01'), new Date())  // days between
diffMonths('2025-01-01', '2026-08-15')        // 19

// Range
startOfMonth(new Date())                      // 2026-08-01 00:00:00
endOfMonth(new Date())                        // 2026-08-31 23:59:59
startOfWeek(new Date())                       // Last Sunday

// Checks
isToday(new Date())                           // true
isWeekend(new Date('2026-08-15'))             // false (Saturday)
isLeapYear(2024)                              // true
isBetween(new Date(), '2026-01-01', '2027-01-01') // true

// Countdown
countdown(new Date('2027-01-01'))
// { total: ms, days: 138, hours: 11, minutes: 55, seconds: 45 }

// Unix timestamps
toUnixTimestamp(new Date())                   // 1755295454
fromUnixTimestamp(1755295454)                 // Date object

// Date parts
getWeekOfYear(new Date())                     // 33
getDayOfYear(new Date())                      // 227
getQuarter(new Date())                        // 3
getDaysInMonth(new Date())                    // 31
getDayName(new Date())                        // 'Friday'
getMonthName(new Date())                      // 'August'
```

---

## ✅ Validation (57 functions)

```javascript
const { isEmail, isPAN, isAadhaar, isCreditCard, isStrongPassword } = require('core-helper-packages');

// Standard
isEmail('user@example.com')              // true
isURL('https://github.com')              // true
isIPv4('192.168.1.1')                    // true
isUUID('550e8400-e29b-41d4-a716-446655440000') // true
isJWT('aaa.bbb.ccc')                     // true
isSemver('1.2.3-beta.1')                 // true
isSlug('hello-world-123')                // true

// Phone & Card
isPhone('+14155552671')                  // true (E.164)
isIndianPhone('+919876543210')           // true
isCreditCard('4111111111111111')         // true (Luhn check)
isVisa('4111111111111111')               // true

// India-specific
isPAN('ABCDE1234F')                      // true
isAadhaar('234123412345')                // true
isGSTIN('22ABCDE1234F1Z5')              // true
isIFSC('SBIN0001234')                    // true

// Finance
isIBAN('GB82WEST12345698765432')         // true
isBIC('DEUTDEDB')                        // true

// Password
isStrongPassword('MyP@ss123!')           // true
passwordStrength('MyP@ss123!')           // 4 (max strength)

// Data
isJSON('{"a":1}')                        // true
isBase64('aGVsbG8=')                     // true
isMD5('d41d8cd98f00b204e9800998ecf8427e') // true
isHexColor('#FF5733')                    // true
isDataURI('data:image/png;base64,...')   // true
```

---

## ⚡ Function Utilities (29 functions)

```javascript
const { debounce, throttle, memoize, curry, pipe, compose, retry } = require('core-helper-packages');

// Rate limiting
const search = debounce(query => fetchData(query), 300);
const onScroll = throttle(() => updatePosition(), 100);

// Memoization
const expFib = memoize(n => n <= 1 ? n : expFib(n-1) + expFib(n-2));
expFib(40); // Blazing fast!

// Functional composition
const process = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, '-')
);
process('  Hello World  '); // 'hello-world'

// Currying
const multiply = curry((a, b) => a * b);
const double = multiply(2);
double(5); // 10

// Error handling
const [err, result] = tryCatch(() => JSON.parse('invalid'));
// [SyntaxError, null]

// Retry async
const data = await retry(() => fetchFromAPI(), 3, 1000);

// Utilities
const add5 = partial((a, b) => a + b, 5);
add5(3); // 8
once(() => initializeDB())(); // only runs once ever
```

---

## 🎨 Color Utilities (30 functions)

```javascript
const { hexToRgb, darken, complementary, colorPalette } = require('core-helper-packages');

// Conversion
hexToRgb('#FF5733')          // {r:255, g:87, b:51}
rgbToHex(255, 87, 51)        // '#FF5733'
hexToHsl('#FF5733')          // {h:11, s:100, l:60}
hexToRgba('#FF5733', 0.5)    // 'rgba(255,87,51,0.5)'

// Manipulation
darken('#FF5733', 15)         // darker version
lighten('#FF5733', 15)        // lighter version
saturate('#FF5733', 20)       // more vibrant
desaturate('#FF5733', 20)     // less vibrant
grayscale('#FF5733')          // '#A9A9A9'
invertColor('#FF5733')        // '#00A8CC'
mixColors('#FF0000','#0000FF',0.5) // '#7F007F'

// Color theory
complementary('#FF5733')      // opposite hue
triadic('#FF5733')            // 3 evenly spaced hues
analogous('#FF5733')          // adjacent hues
tetradic('#FF5733')           // 4 square hues

// Accessibility (WCAG)
getContrastRatio('#000000','#FFFFFF') // 21 (max)
isLightColor('#FFFF00')               // true
bestTextColor('#FF5733')              // '#FFFFFF' (for readability)

// Generators
randomColor()                  // '#A3F2B1'
colorPalette(5)                // 5 evenly spaced hues
randomPastel()                 // soft pastel color
```

---

## ⏳ Async Utilities (22 functions)

```javascript
const { sleep, retry, parallel, sequential, asyncMap } = require('core-helper-packages');

// Sleep
await sleep(1000); // waits 1 second

// Retry with exponential backoff-like control
const data = await retry(() => fetch(url).then(r=>r.json()), 3, 500);

// Parallel with concurrency limit
const results = await asyncMap(urls, url => fetch(url).then(r=>r.json()), 5);

// Sequential execution
const results = await sequential([
  () => step1(),
  () => step2(),
  () => step3()
]);

// Waterfall (pass result to next)
const final = await waterfall([
  val => val + 1,
  val => val * 2,
  val => `Result: ${val}`
], 5); // 'Result: 12'

// Timeout
const result = await withTimeout(fetchData(), 5000);

// Deferred promise
const { promise, resolve, reject } = deferred();
setTimeout(() => resolve('done!'), 1000);
await promise; // 'done!'

// Async queue with concurrency
const queue = createQueue(3);
await Promise.all(items.map(item => queue.add(() => processItem(item))));

// Cancellable
const { promise, cancel } = cancellable(() => longRunningTask());
setTimeout(cancel, 2000); // cancel after 2s
```

---

## 🌐 DOM Utilities (41 functions — browser only)

```javascript
const { getElement, addClass, on, copyToClipboard, lsGet } = require('core-helper-packages/dom');

// Elements
const btn = getElement('#myButton');
createElement('div', { class: 'card', id: 'card1' }, 'Hello World');

// Classes
addClass(btn, 'active', 'highlighted');
toggleClass(btn, 'active');
hasClass(btn, 'active'); // true

// Events (returns cleanup!)
const cleanup = on(btn, 'click', handler);
// Later: cleanup() to remove listener

// Style
setCss(btn, 'color', 'red');
setCssMany(btn, { color: 'red', fontSize: '16px' });
getCss(btn, 'color'); // computed value

// Cookies
setCookie('token', 'abc123', 7);
getCookie('token'); // 'abc123'

// localStorage (auto JSON)
lsSet('user', { name: 'Jeel', role: 'admin' });
lsGet('user'); // { name: 'Jeel', role: 'admin' }

// Clipboard & Download
await copyToClipboard('Hello World!');
downloadFile('Hello World', 'hello.txt');

// Viewport
isInViewport(el);         // true/false
getScrollPosition();      // { x: 0, y: 200 }
getViewport();            // { width: 1920, height: 1080 }
isMobile();               // false
```

---

## 🏗️ Framework Integration

### Angular
```typescript
import { Injectable } from '@angular/core';
import { isEmail, formatDate, debounce, isPAN } from 'core-helper-packages';

@Injectable({ providedIn: 'root' })
export class HelperService {
  validateEmail = isEmail;
  formatDate = formatDate;
  search = debounce((term: string) => this.doSearch(term), 300);
}
```

### React
```tsx
import { useState, useCallback } from 'react';
import { debounce, cloneDeep, formatRelative } from 'core-helper-packages';

function MyComponent() {
  const handleSearch = useCallback(
    debounce((val: string) => fetchResults(val), 300), []
  );
  return <input onChange={e => handleSearch(e.target.value)} />;
}
```

### Vue
```vue
<script setup>
import { isEmail, formatDate, truncate } from 'core-helper-packages';
</script>
```

---

## 📄 License

ISC © [Jeel Patel](https://github.com/Jeelpatel0903)
