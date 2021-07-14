# Jackens’ Collection

## TOC

### Code @ `./js`

- [`$.js`](#jsjs): Lightweight helper for creating and modifying DOM elements.
- [`_.js`](#js_js): Language versioning helper.
- [`_in.js`](#js_injs): Replacement for the `in` operator (not to be confused with the `for-in` loop) that works properly.
- [`_typeof.js`](#js_typeofjs): Set of type testing helpers.
- [`app.js`](#jsappjs): Web application globals object.
- [`chess.js`](#jschessjs): Simple chess application showing attack/defense counters.
- [`common.js`](#jscommonjs): Common constants, aliases, and type definitions.
- [`deep-equal.js`](#jsdeep-equaljs): Helper that verifies deeply equality of two arguments of any type.
- [`dev-ws-fs.js`](#jsdev-ws-fsjs): Proof of Concept of a WebSocket server exposing a file system.
- [`dev-ws-mariadb.js`](#jsdev-ws-mariadbjs): Proof of Concept of a WebSocket server providing a connection to a MariaDB database.
- [`dev-ws.js`](#jsdev-wsjs): Proof of Concept of the WebSocket server that supports specified handlers.
- [`download.js`](#jsdownloadjs): Helper for handling client-side (web browser) generated downloads.
- [`ds.js`](#jsdsjs): SQL Data Source CRUD abstraction methods.
- [`elvis.js`](#jselvisjs): Set of data manipulation helpers.
- [`escape.js`](#jsescapejs): Helper for creating secure SQL queries.
- [`fix-typography.js`](#jsfix-typographyjs): Helper implementing typographic corrections appropriate for Polish typography.
- [`gantt-chart.js`](#jsgantt-chartjs): `$` helper usage demo presenting simple Gantt Chart.
- [`icons-demo.js`](#jsicons-demojs): `svgUse` and `svg` helpers demo.
- [`isd.js`](#jsisdjs): Set of helpers for full-text search.
- [`jc-demo.js`](#jsjc-demojs): `jc` converter usage demo.
- [`jc.js`](#jsjcjs): Convenient converter from `JC_CONFIG` format to `$CONFIG` format.
- [`js-on-parse.js`](#jsjs-on-parsejs): `JSON.parse` with “JavaScript turned on”.
- [`js2css.js`](#jsjs2cssjs): Helper that converts JavaScript objects in `JS2CSS` format to CSS definitions.
- [`login-page.js`](#jslogin-pagejs): Generic login page.
- [`matcher.js`](#jsmatcherjs): Set of tools for `MATCH`ing patterns without regular expressions.
- [`mdtp.js`](#jsmdtpjs): Blogging platform based on Markdown and $\KaTeX$.
- [`nanolight.js`](#jsnanolightjs): Simple JavaScript syntax highlighter.
- [`nogi-stonogi.js`](#jsnogi-stonogijs): Best strategy provider for “Nogi stonogi” board game.
- [`pink-painter.js`](#jspink-painterjs): Puzzle game.
- [`pl-ural.js`](#jspl-uraljs): Helper for choosing the correct singular and plural form for Polish (but not only!)
- [`preloader.js`](#jspreloaderjs): Animated gear preloader.
- [`simple-login-page.js`](#jssimple-login-pagejs): Simple login page DIV.
- [`style.js`](#jsstylejs): Helper for creating `<style>` elements.
- [`svg-use.js`](#jssvg-usejs): Helper for creating `<svg><use>` elements.
- [`svg.js`](#jssvgjs): Helper for creating `<svg>` container elements.
- [`symbol.js`](#jssymboljs): Helper for creating `<symbol>` elements.
- [`test.js`](#jstestjs): Unit tests.
- [`todo-board.js`](#jstodo-boardjs): Board page of simple self-hosted Trello/Wekan alternative app.
- [`todo.js`](#jstodojs): Simple self-hosted Trello/Wekan alternative app.
- [`ui.js`](#jsuijs): User Interface helpers.
- [`uuidv1.js`](#jsuuidv1js): UUID v1 identifier (containing creation timestamp) generator.
- [`ws.js`](#jswsjs): RPC (Remote Procedure Call) over WebSockets.

### Code @ `./style.js`

- [`chess.style.js`](#stylejschessstylejs): Styles for simple chess application showing attack/defense counters.
- [`jc.style.js`](#stylejsjcstylejs): CSS rules for `jc` converter in `JS2CSS` format — component styles and component layout system.
- [`mdtp.style.js`](#stylejsmdtpstylejs): Styles for blogging platform based on Markdown and $\KaTeX$.
- [`nogi-stonogi.style.js`](#stylejsnogi-stonogistylejs): Styles for best strategy provider for “Nogi stonogi” board game.
- [`pink-painter.style.js`](#stylejspink-painterstylejs): Style for “Pink Painter” puzzle game.
- [`preloader.style.js`](#stylejspreloaderstylejs): Styles for animated gear preloader.
- [`todo-page.style.js`](#stylejstodo-pagestylejs): Styles for simple self-hosted Trello alternative.

### Demos

- [Chess](https://jackens.github.io/app/chess/): Simple chess application showing attack/defense counters.
- [Gantt chart](https://jackens.github.io/app/gantt-chart/): `$` helper usage demo presenting simple Gantt Chart.
- [Jackens’ Components demo](https://jackens.github.io/app/jc-demo/): `jc` converter usage demo.
- [MDTP](https://jackens.github.io/app/mdtp/): Blogging platform based on Markdown and $\KaTeX$.
- [Nogi stonogi](https://jackens.github.io/app/nogi-stonogi/): Best strategy provider for “Nogi stonogi” board game.
- [Pink Painter](https://jackens.github.io/app/pink-painter/): Puzzle game.

## `js/$.js`

[Source Code](js/$.js) • [Unit Tests](test.js/$.test.js)

### Description

Lightweight helper for creating and modifying DOM elements.

### Imports

```js
import { ASSIGN, DOCUMENT, EMPTY_STRING, ENTRIES, NAMESPACE_SVG } from './common.js'
import { _Boolean, _Element, _Number, _Object, _String } from './_typeof.js'
```

### Exports

```ts
export function $({ a, e, i, k, n, p, t }: $CONFIG): $E<Element | HTMLElement | Text>;
```

## `js/_.js`

[Source Code](js/_.js) • [Unit Tests](test.js/_.test.js)

### Description

Language versioning helper.

### Imports

```js
import { app } from './app.js'
import { get } from './elvis.js'
```

### Exports

```ts
export function _(text: string, version: string | null): string;
```

## `js/_in.js`

[Source Code](js/_in.js) • [Unit Tests](test.js/_in.test.js)

### Description

Replacement for the `in` operator (not to be confused with the `for-in` loop) that works properly.

### Imports

```js
import { OBJECT } from './common.js'
import { _Number, _String } from './_typeof.js'
```

### Exports

```ts
export function _in(key: any, map: any): boolean;
```

## `js/_typeof.js`

[Source Code](js/_typeof.js) • [Unit Tests](test.js/_typeof.test.js)

### Description

Set of type testing helpers.

### Imports

```js
import { DOCUMENT } from './common.js'
```

### Exports

```ts
export function _typeof(arg: any): string;
export function _Boolean(arg: any): boolean;
export function _Element(arg: any): boolean;
export function _HTMLButtonElement(arg: any): boolean;
export function _HTMLInputElement(arg: any): boolean;
export function _HTMLTextAreaElement(arg: any): boolean;
export function _Number(arg: any): boolean;
export function _Object(arg: any): boolean;
export function _String(arg: any): boolean;
export function _Text(arg: any): boolean;
```

## `js/app.js`

[Source Code](js/app.js)

### Description

Web application globals object.

### Imports

```js
import { _in } from './_in.js'
```

### Exports

```ts
export namespace app {
    function updateLang(): void;
}
```

## `js/chess.js`

[Source Code](js/chess.js) • [Demo](https://jackens.github.io/app/chess/)

### Description

Simple chess application showing attack/defense counters.

### Imports

```js
import icons from '../_icons-out/chess-alpha.js'
import { $ } from './$.js'
import { chessStyle } from '../style.js/chess.style.js'
import { svg } from './svg.js'
import { BODY } from './common.js'
import { obj } from './elvis.js'
import { svgUse } from './svg-use.js'
```

## `js/common.js`

[Source Code](js/common.js)

### Description

Common constants, aliases, and type definitions.

#### `$CONFIG`

Element configuration type:

- `a` (*attributes*): attributes of the created or modified element set by `setAttribute` or `setAttributeNS`
- `e` (*element*): modified element
- `i` (*items*): an array of subelements of the created or modified element
- `k` (*keys*): keys (properties) to set in the created or modified element
- `n` (*namespace*): namespace for `createElementNS`, `setAttributeNS` and `removeAttributeNS` methods
- `p` (*parent*): reference to the parent element for the created or modified element
- `t` (*tag*): tag of the created element

#### `JC_CONFIG`

The `JC_CONFIG` format is based on three main keys:

- `w` (*wrapper*):  `$CONFIG` format configuration of the component wrapper (`HTMLDivElement` element)
- `c` (*control*):  `$CONFIG` format configuration of the component control
- `l` (*label*):    `$CONFIG` format configuration of the component label (`HTMLLabelElement` element; applies to input controls of type `checkbox`, `radio` and `file`)

All other keys are just an alternative, more convenient form for configuration using the main keys.

The sample file selection button component shown below

![](https://jackens.github.io/png/jc.png)

has the following HTML representation:

```html
<div class="jc" label="Label">
  <input type="file" id="jc-1" />
  <div>
    <label for="jc-1">Text</label>
  </div>
</div>
```

The file selection button component shown above was generated by the following code:

```js
import { $ } from '../js/$.js'
import { jc } from '../js/jc.js'
import { jcStyle } from '../style.js/jc.style.js'

window.onload = () => $({
  e: document.body,
  i: [{ e: jcStyle }, jc({ type: 'file', label: 'Label', text: 'Text' })]
})
```

The `JC_CONFIG` format has the following default values:

```js
{ […], t: 'input', class: 'jc', […] }
```

The `icon` and `text` keys are handled in a special way: they allow you to conveniently specify the icon and text of the component you are defining.

All keys supported by the `JC_CONFIG` format:

- `w`: wrapper configuration
- `c`: control configuration
- `l`: label configuration
- `w_a`: `w.a` configuration
- `class`: `w.a.class` configuration
- `label`: `w.a.label` configuration
- `w_k`: `w.k` configuration
- `p`: `w.p` configuration
- `w_p`: `w.p` configuration
- `c_a`: `c.a` configuration
- `type`: `c.a.type` configuration
- `c_i`: `c.i` configuration
- `c_k`: `c.k` configuration
- `onchange`: `c.k.onchange` configuration
- `onclick`: `c.k.onclick` configuration
- `oninput`: `c.k.oninput` configuration
- `onkeyup`: `c.k.onkeyup` configuration
- `style`: `c.k.style` configuration
- `c_t`: `c.t` configuration
- `t`: `c.t` configuration
- `l_a`: `l.a` configuration
- `l_i`: `l.i` configuration
- `l_k`: `l.k` configuration
- `icon`: icon
- `text`: text
- `[key: string]`:
    - `w.a[key]` configuration if `key.slice(0, 4) === 'w_a_'`
    - `w.k[key]` configuration if `key.slice(0, 4) === 'w_k_'`
    - `c.a[key]` configuration if `key.slice(0, 4) === 'c_a_'`
    - `c.k[key]` configuration if `key.slice(0, 4) === 'c_k_'`
    - `l.a[key]` configuration if `key.slice(0, 4) === 'l_a_'`
    - `l.k[key]` configuration if `key.slice(0, 4) === 'l_k_'`
    - `c.a[key]` configuration otherwise

### Exports

```ts
export const DOCUMENT: Document;
export const BODY: HTMLElement;
export const OBJECT: ObjectConstructor;
export const ASSIGN: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export const CREATE: {
    (o: object): any;
    (o: object, properties: PropertyDescriptorMap & ThisType<any>): any;
};
export const ENTRIES: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): [string, T][];
    (o: {}): [string, any][];
};
export const KEYS: {
    (o: object): string[];
    (o: {}): string[];
};
export const VALUES: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): T[];
    (o: {}): any[];
};
export const IS_ARRAY: (arg: any) => arg is any[];
export const EMPTY_STRING: "";
export const NAMESPACE_SVG: "http://www.w3.org/2000/svg";
export type MAP<T> = {
    [key: string]: T;
};
export type TREE<T> = {
    [key: string]: T | TREE<T>;
};
export type $E<T> = {
    e: T;
};
export type $CONFIG = {
    a?: MAP<any>;
    e?: Element | Text | string | number;
    i?: $CONFIG[];
    k?: MAP<any>;
    n?: string;
    p?: Element;
    t?: string;
};
export type JC_CONFIG = {
    [key: string]: any;
    w?: $CONFIG;
    c?: $CONFIG;
    l?: $CONFIG;
    w_a?: MAP<any>;
    class?: string;
    label?: string;
    w_k?: MAP<any>;
    p?: HTMLElement;
    w_p?: HTMLElement;
    c_a?: MAP<any>;
    type?: string;
    c_i?: $CONFIG[];
    c_k?: MAP<any>;
    onchange?: any;
    onclick?: any;
    oninput?: any;
    onkeyup?: any;
    style?: MAP<any>;
    t?: string;
    c_t?: string;
    l_a?: MAP<any>;
    l_i?: $CONFIG[];
    l_k?: MAP<any>;
    icon?: string;
    text?: string;
};
export type JS2CSS = MAP<TREE<string | number>>;
export type CHUNK = [number?, ...any[]];
export type CHUNKS = [number?, ...any[]][];
export type MATCH = MATCH;
export type MATCHES = MATCH[];
export type TOKEN = [string, ...any[]];
export type TOKENS = [string, ...any[]][];
```

## `js/deep-equal.js`

[Source Code](js/deep-equal.js) • [Unit Tests](test.js/deep-equal.test.js)

### Description

Helper that verifies deeply equality of two arguments of any type.
An iterative implementation that does not cause a stack overflow error.

### Imports

```js
import { IS_ARRAY, EMPTY_STRING } from './common.js'
import { _typeof, _Object } from './_typeof.js'
```

### Exports

```ts
export function deepEqual(actual: any, expected: any): boolean;
```

## `js/dev-ws-fs.js`

[Source Code](js/dev-ws-fs.js)

### Description

Proof of Concept of a WebSocket server exposing a file system.

### Imports

```js
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import devWs from './dev-ws.js'
```

## `js/dev-ws-mariadb.js`

[Source Code](js/dev-ws-mariadb.js)

### Description

Proof of Concept of a WebSocket server providing a connection to a MariaDB database.

### Imports

```js
import { createConnection } from 'mariadb'
import devWs from './dev-ws.js'
```

## `js/dev-ws.js`

[Source Code](js/dev-ws.js)

### Description

Proof of Concept of the WebSocket server that supports specified handlers.

### Imports

```js
import ws from 'ws'
```

### Exports

```ts
declare function _default(handlers: MAP<(params: {
    clients: WebSocket[];
    socket: WebSocket;
    data: object;
}) => Promise<void>>): void;
export default _default;
```

## `js/download.js`

[Source Code](js/download.js)

### Description

Helper for handling client-side (web browser) generated downloads.

### Imports

```js
import { $ } from './$.js'
import { BODY } from './common.js'
```

### Exports

```ts
export function download(a: BlobPart[], download: string, type: string): void;
```

## `js/ds.js`

[Source Code](js/ds.js) • [Unit Tests](test.js/ds.test.js)

### Description

SQL Data Source CRUD abstraction methods.

### Imports

```js
import { app } from './app.js'
import { CREATE, KEYS } from './common.js'
import { a2o, oop } from './elvis.js'
import { escape } from './escape.js'
```

### Exports

```ts
export function ds(schema: string, table: string, columns: string[]): {
    insert: (data: MAP<any>) => Promise<boolean>;
    select: (where: MAP<any>) => Promise<MAP<MAP<any>>>;
    update: (data: MAP<any>, name: string, value: any) => Promise<boolean>;
    delete: (data: MAP<any>) => Promise<boolean>;
};
```

## `js/elvis.js`

[Source Code](js/elvis.js) • [Unit Tests](test.js/elvis.test.js)

### Description

Set of data manipulation helpers.

- `arr`: Array from tagged template literal.
- `a2o`: Array to object.
- `obj`: Object from tagged template literal.
- `get`: Helper similar to ? operator. (Elvis operator) for easy accessing nested object values.
- `set`: Helper similar to ? operator. (Elvis operator) for easy assigning values to nested objects.
- `oop`: Object Oriented Programming helper.

### Imports

```js
import { CREATE, KEYS } from './common.js'
import { _in } from './_in.js'
```

### Exports

```ts
export function arr(params_0: TemplateStringsArray, ...params_1: any[]): string[];
export function a2o(arrayOfValues: any[]): (result: MAP<any>, key: string, index: number) => MAP<any>;
export function obj(params_0: TemplateStringsArray, ...params_1: any[]): MAP<string>;
export function get(ref: object, ...keys: string[]): object | undefined;
export function set(ref: object, ...keys: string[]): object | undefined;
export function oop(mapOfMethodsToBind: MAP<(...params: any[]) => any>, ...paramsToBind: any[]): MAP<(...params: any[]) => any>;
```

## `js/escape.js`

[Source Code](js/escape.js) • [Unit Tests](test.js/escape.test.js)

### Description

Helper for creating secure SQL queries.

- `value`: Helper for escaping values.
- `name`:  Helper for escaping column, table and schema names.
- `type`:  Methods that implement value escape for particular types.
- `query`: Tagged Template Literal helper for creating secure SQL queries.

### Imports

```js
import { _typeof } from './_typeof.js'
```

### Exports

```ts
export namespace escape {
    function value(value: any): string;
    function name(name: string): string;
    const type: MAP<(value: any) => string>;
    function query(template: TemplateStringsArray, ...substitutions: any[]): string;
}
```

## `js/fix-typography.js`

[Source Code](js/fix-typography.js) • [Unit Tests](test.js/fix-typography.test.js)

### Description

Helper implementing typographic corrections appropriate for Polish typography.
An iterative implementation that does not cause a stack overflow error.

### Imports

```js
import { $ } from './$.js'
import { EMPTY_STRING } from './common.js'
import { obj } from './elvis.js'
import { _Element, _Text } from './_typeof.js'
```

### Exports

```ts
export function fixTypography(htmlElement: HTMLElement): void;
```

## `js/gantt-chart.js`

[Source Code](js/gantt-chart.js) • [Demo](https://jackens.github.io/app/gantt-chart/)

### Description

`$` helper usage demo presenting simple Gantt Chart.

### Imports

```js
import { $ } from './$.js'
import { BODY } from './common.js'
```

## `js/icons-demo.js`

[Source Code](js/icons-demo.js)

### Description

`svgUse` and `svg` helpers demo.

### Imports

```js
import { preloaderStyle } from '../style.js/preloader.style.js'
import gear from '../_icons-out/framework7io-framework7-icons/gear.js'
import { $ } from './$.js'
import { BODY, KEYS, VALUES } from './common.js'
import { preloader } from './preloader.js'
import { svgUse } from './svg-use.js'
import { svg } from './svg.js'
```

## `js/isd.js`

[Source Code](js/isd.js) • [Unit Tests](test.js/isd.test.js)

### Description

Set of helpers for full-text search.

- `index`:  Method that indexes words from the given `textToIndex` text within the `id` identifier.
- `scores`: Method that searches for words from the given `textToSearch` text among indexed words (case sensitive). Returns a map of non-zero relevance coefficients for registered identifiers.
- `didYouMean`: For words of given text `textToSearch` returns suggestions of replacement, indexed words (case sensitive). Works based on *Levenshtein distances* with weights lowered to 0.3 for Polish diacritics.

### Imports

```js
import { CREATE, KEYS } from './common.js'
import { oop } from './elvis.js'
import { _in } from './_in.js'
```

### Exports

```ts
export function ids(): {
    index: (textToIndex: string, id: string) => void;
    scores: (textToSearch: string) => MAP<number>;
    didYouMean: (textToSearch: string) => MAP<number>;
};
```

## `js/jc-demo.js`

[Source Code](js/jc-demo.js) • [Demo](https://jackens.github.io/app/jc-demo/)

### Description

`jc` converter usage demo.

### Imports

```js
import doc from '../_icons-out/framework7io-framework7-icons/doc.js'
import paperplane from '../_icons-out/framework7io-framework7-icons/paperplane.js'
import photo from '../_icons-out/framework7io-framework7-icons/photo.js'
import { $ } from './$.js'
import { BODY } from './common.js'
import { jcStyle } from '../style.js/jc.style.js'
import { jc } from './jc.js'
import { svg } from './svg.js'
```

## `js/jc.js`

[Source Code](js/jc.js) • [Unit Tests](test.js/jc.test.js)

### Description

Convenient converter from `JC_CONFIG` format to `$CONFIG` format.

### Imports

```js
import { ASSIGN, ENTRIES, IS_ARRAY } from './common.js'
import { obj } from './elvis.js'
import { svgUse } from './svg-use.js'
import { _Object } from './_typeof.js'
```

### Exports

```ts
export function jc(config: JC_CONFIG): $CONFIG;
```

## `js/js-on-parse.js`

[Source Code](js/js-on-parse.js) • [Unit Tests](test.js/js-on-parse.test.js)

### Description

`JSON.parse` with “JavaScript turned on”.

Objects having exactly one `«handlerName»` property present in the handlers map, i.e. objects of form:

```js
{ "«handlerName»": «param» }
```

and

```js
{ "«handlerName»": [«params»] }
```

are replaced by the result of call

```js
handlers['«handlerName»'](«param»)
```

and

```js
handlers['«handlerName»'](...«params»)
```

Remark. To pass to `handlers['"handlerName"]` a single argument that is an array, use the following form:

```js
{ "«handlerName»": [[«elements»]] }
```

which will force a call

```js
handlers['«handlerName»']([«elements»])
```

### Imports

```js
import { IS_ARRAY } from './common.js'
import { _in } from './_in.js'
import { _Object } from './_typeof.js'
```

### Exports

```ts
export function jsOnParse(text: string, handlers: MAP<(...params: any[]) => any>): any;
```

## `js/js2css.js`

[Source Code](js/js2css.js) • [Unit Tests](test.js/js2css.test.js)

### Description

Helper that converts JavaScript objects in `JS2CSS` format to CSS definitions.
An iterative implementation that does not cause a stack overflow error.

The `JS2CSS` format provides a hierarchical description of CSS rules.

- Keys of subobjects whose values are NOT objects are treated as CSS attribute, and values are treated as values of those CSS attributes; the concatenation of keys of all parent objects is a CSS rule.
- All keys ignore the part starting with a $ sign until the end of the key (e.g. `src$1` → `src`, `@font-face$1` → `@font-face`).
- In keys specifying CSS attribute, all uppercase letters are replaced by lowercase letters with an additional - character preceding them (e.g. `fontFamily` → `font-family`).
- Commas in keys that makes a CSS rule cause it to “split” and create separate rules for each part (e.g. `{div:{'.a,.b,.c':margin:0}}` → `div.a{margin:0}div.b{margin:0}div.c{margin:0}`).
- Top-level keys that begin with `@` are not concatenated with subobject keys.

### Imports

```js
import { EMPTY_STRING, IS_ARRAY } from './common.js'
import { _Number, _String } from './_typeof.js'
```

### Exports

```ts
export function js2css(style: JS2CSS): string;
```

## `js/login-page.js`

[Source Code](js/login-page.js)

### Description

Generic login page.

### Imports

```js
import { $ } from './$.js'
import { app } from './app.js'
import { ASSIGN, BODY, EMPTY_STRING } from './common.js'
import { set } from './elvis.js'
import { jcStyle } from '../style.js/jc.style.js'
import { preloaderStyle } from '../style.js/preloader.style.js'
import { preloader } from './preloader.js'
import { disable, enable, getInputs } from './ui.js'
import { ws } from './ws.js'
import { _ } from './_.js'
import { _HTMLInputElement, _HTMLTextAreaElement } from './_typeof.js'
```

### Exports

```ts
export function loginPage(page: any): Promise<any>;
```

## `js/matcher.js`

[Source Code](js/matcher.js)

### Description

Set of tools for `MATCH`ing patterns without regular expressions.

The reason for not using regular expressions is a ReDoS problem (see <https://en.wikipedia.org/wiki/ReDoS>). In addition, regular expressions, like finite-state machines, have no memory.

- `TOTAL`: For the given `CHUNKS` returns the total matching length. For empty `CHUNKS` (i.e. `[]`) `undefined` is returned.
- `METADATA`: Returns `MATCH` function that returns `CHUNKS` returned by the given `MATCH` function with passed `metadata` element pushed to each `CHUNK`.
- `METADATA_RESET`: Returns `MATCH` function that returns `CHUNKS` returned by the given `MATCH` function restricted to the first elements with passed `metadata` element pushed to each `CHUNK`.
- `BEST_FIRST`: For the given `MATCHES` returns *first* `MATCH` function with largest `TOTAL` value.
- `BEST_LAST`: For the given `MATCHES` returns *last* `MATCH` function with largest `TOTAL` value.
- `OPTIONAL`: For the given `MATCH` function returns `MATCH` function that returns the same `CHUNKS` or `[[0]]` instead of `[]`.
- `MERGE`: For the given `MATCH` function returns `MATCH` function that returns `CHUNKS` containing single `CHUNK` with `TOTAL` value.
- `REPEAT`: For the given `MATCH` function returns a `MATCH` function that returns a concatenation of repeated matches.
- `CHAR`: Returns `MATCH` function that matches the given `char`.
- `NOT_CHAR`: Returns `MATCH` function that matches any character other than the given `char`.
- `CHARS`: Returns `MATCH` function that matches any of the given `chars`.
- `NOT_CHARS`: Returns `MATCH` function that matches any character except the given `chars`.
- `WORD`: Returns `MATCH` function that matches the given `word`.
- `NOT_WORD`: Returns `MATCH` function that matches the shortest string (of length at most `word.length - 1`) that is not a prefix of the given `word`.
- `WORDS`: Returns `MATCH` function that matches any of the given `words`.
- `matcher`: For the given `MATCH` function returns a function that returns `TOKENS` related with `CHUNKS` returned by multiple calls of the given `MATCH` function. The `matcher` function called with `BEST_FIRST` or `BEST_LAST` returns tokenizer.

### Exports

```ts
export function TOTAL(chunks: CHUNKS): number | undefined;
export function METADATA(metadata: any, match: MATCH): MATCH;
export function METADATA_RESET(metadata: any, match: MATCH): MATCH;
export const BEST_FIRST: (matches: MATCHES) => MATCH;
export const BEST_LAST: (matches: MATCHES) => MATCH;
export function OPTIONAL(match: MATCH): MATCH;
export function MERGE(match: MATCH): MATCH;
export function GROUP(matches: MATCHES): MATCH;
export function REPEAT(match: MATCH): MATCH;
export function CHAR(char: string): MATCH;
export function NOT_CHAR(char: string): MATCH;
export function CHARS(chars: MAP<string>): MATCH;
export function NOT_CHARS(chars: MAP<string>): MATCH;
export function WORD(word: string): MATCH;
export function NOT_WORD(word: string): MATCH;
export function WORDS(words: string[]): MATCH;
export function matcher(match: MATCH): (text: string) => TOKENS;
```

## `js/mdtp.js`

[Source Code](js/mdtp.js) • [Demo](https://jackens.github.io/app/mdtp/)

### Description

Blogging platform based on Markdown and $\KaTeX$.

### Imports

```js
import katexCss from '../_libs-out/katex-css.min.js'
import markdownItKatex from '../_libs-out/markdown-it-katex.min.js'
import markdownItLinkAttributes from '../_libs-out/markdown-it-link-attributes.min.js'
import markdownIt from '../_libs-out/markdown-it.min.js'
import { mdtpStyle } from '../style.js/mdtp.style.js'
import { $ } from './$.js'
import { BODY } from './common.js'
import { fixTypography } from './fix-typography.js'
import { nanolight } from './nanolight.js'
```

## `js/nanolight.js`

[Source Code](js/nanolight.js)

### Description

Simple JavaScript syntax highlighter.

### Imports

```js
import { arr, obj } from './elvis.js'
import { BEST_FIRST, CHAR, CHARS, GROUP, matcher, MERGE, METADATA, NOT_CHAR, NOT_CHARS, NOT_WORD, OPTIONAL, REPEAT, WORD, WORDS } from './matcher.js'
```

### Exports

```ts
export function nanolight(code: string): string;
```

## `js/nogi-stonogi.js`

[Source Code](js/nogi-stonogi.js) • [Demo](https://jackens.github.io/app/nogi-stonogi/)

### Description

Best strategy provider for “Nogi stonogi” board game.

### Imports

```js
import { nogiStonogiData } from '../data.js/nogi-stonogi.data.js'
import { nogiStonogiStyle } from '../style.js/nogi-stonogi.style.js'
import { $ } from './$.js'
import { BODY } from './common.js'
```

## `js/pink-painter.js`

[Source Code](js/pink-painter.js) • [Demo](https://jackens.github.io/app/pink-painter/)

### Description

Puzzle game.

![](https://jackens.github.io/jpeg/pink-painter.jpeg)

### Imports

```js
import arrowClockwiseCircleFill from '../_icons-out/framework7io-framework7-icons/arrow_clockwise_circle_fill.js'
import arrowLeftCircleFill from '../_icons-out/framework7io-framework7-icons/arrow_left_circle_fill.js'
import arrowRightCircleFill from '../_icons-out/framework7io-framework7-icons/arrow_right_circle_fill.js'
import scope from '../_icons-out/framework7io-framework7-icons/scope.js'
import { $ } from './$.js'
import { BODY, DOCUMENT } from './common.js'
import { pinkPainterStyle } from '../style.js/pink-painter.style.js'
import { svgUse } from './svg-use.js'
import { svg } from './svg.js'
```

## `js/pl-ural.js`

[Source Code](js/pl-ural.js) • [Unit Tests](test.js/pl-ural.test.js)

### Description

Helper for choosing the correct singular and plural form for Polish (but not only!)

### Exports

```ts
export function plUral(value: number, singular: string, plural2: string, plural5: string, noValue1: string | null, noValue: string | null): string;
```

## `js/preloader.js`

[Source Code](js/preloader.js)

### Description

Animated gear preloader.

### Imports

```js
import { $ } from './$.js'
import { svgUse } from './svg-use.js'
```

### Exports

```ts
export const preloader: SVGSVGElement;
```

## `js/simple-login-page.js`

[Source Code](js/simple-login-page.js)

### Description

Simple login page DIV.

### Imports

```js
import { $ } from './$.js'
import { jc } from './jc.js'
import { _ } from './_.js'
```

### Exports

```ts
export const simpleLoginPage: HTMLDivElement;
```

## `js/style.js`

[Source Code](js/style.js)

### Description

Helper for creating `<style>` elements.

### Imports

```js
import { $ } from './$.js'
import { js2css } from './js2css.js'
```

### Exports

```ts
export function style(style: JS2CSS): HTMLStyleElement;
```

## `js/svg-use.js`

[Source Code](js/svg-use.js) • [Unit Tests](test.js/svg-use.test.js)

### Description

Helper for creating `<svg><use>` elements.

### Imports

```js
import { ASSIGN } from './common.js'
```

### Exports

```ts
export function svgUse(id: string, { a, k }?: import('./common').$CONFIG): import('./common').$CONFIG;
```

## `js/svg.js`

[Source Code](js/svg.js)

### Description

Helper for creating `<svg>` container elements.

### Imports

```js
import { $ } from './$.js'
import { symbol } from './symbol.js'
```

### Exports

```ts
export function svg(...params: Array<$CONFIG | $CONFIG[]>): $E<SVGSVGElement>;
```

## `js/symbol.js`

[Source Code](js/symbol.js)

### Description

Helper for creating `<symbol>` elements.

### Imports

```js
import { $ } from './$.js'
import { NAMESPACE_SVG } from './common.js'
```

### Exports

```ts
export function symbol(config: $CONFIG): $E<SVGSymbolElement>;
```

## `js/test.js`

[Source Code](js/test.js)

### Description

Unit tests.

### Imports

```js
import $Test from '../test.js/$.test.js'
import deepEqualTest from '../test.js/deep-equal.test.js'
import dsTest from '../test.js/ds.test.js'
import elvisTest from '../test.js/elvis.test.js'
import escapeTest from '../test.js/escape.test.js'
import fixTypographyTest from '../test.js/fix-typography.test.js'
import isdTest from '../test.js/isd.test.js'
import jcTest from '../test.js/jc.test.js'
import jsOnParseTest from '../test.js/js-on-parse.test.js'
import js2cssTest from '../test.js/js2css.test.js'
import plUralTest from '../test.js/pl-ural.test.js'
import svgUseTest from '../test.js/svg-use.test.js'
import uuidv1Test from '../test.js/uuidv1.test.js'
import _Test from '../test.js/_.test.js'
import _inTest from '../test.js/_in.test.js'
import _typeofTest from '../test.js/_typeof.test.js'
import { deepEqual } from './deep-equal.js'
```

## `js/todo-board.js`

[Source Code](js/todo-board.js)

### Description

Board page of simple self-hosted Trello/Wekan alternative app.

### Imports

```js
import { $ } from './$.js'
import { app } from './app.js'
import { ASSIGN, BODY, EMPTY_STRING, VALUES } from './common.js'
import { ds } from './ds.js'
import { svgUse } from './svg-use.js'
import { CLASS_TODO_LIST, CLASS_TODO_TASK, CLASS_TODO_TASKS, LIST_WIDTH, PADDING, todoPageStyle } from '../style.js/todo-page.style.js'
import { _ } from './_.js'
import { _Element } from './_typeof.js'
```

### Exports

```ts
export function todoBoard(): Promise<void>;
```

## `js/todo.js`

[Source Code](js/todo.js)

### Description

Simple self-hosted Trello/Wekan alternative app.

### Imports

```js
import gear from '../_icons-out/framework7io-framework7-icons/gear.js'
import paperPlane from '../_icons-out/framework7io-framework7-icons/paperplane.js'
import plus from '../_icons-out/framework7io-framework7-icons/plus.js'
import trashCircle from '../_icons-out/framework7io-framework7-icons/trash_circle.js'
import { $ } from './$.js'
import { app } from './app.js'
import { BODY } from './common.js'
import { loginPage } from './login-page.js'
import { simpleLoginPage } from './simple-login-page.js'
import { svg } from './svg.js'
import { todoBoard } from './todo-board.js'
```

## `js/ui.js`

[Source Code](js/ui.js)

### Description

User Interface helpers.

### Imports

```js
import { $ } from './$.js'
import { _Element, _HTMLButtonElement, _HTMLInputElement, _HTMLTextAreaElement } from './_typeof.js'
```

### Exports

```ts
export function disable(e: Element): any;
export function enable(e: Element): any;
export function getInputs(e: HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement): Array<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>;
```

## `js/uuidv1.js`

[Source Code](js/uuidv1.js) • [Unit Tests](test.js/uuidv1.test.js)

### Description

UUID v1 identifier (containing creation timestamp) generator.

### Imports

```js
import { EMPTY_STRING } from './common.js'
```

### Exports

```ts
export function uuidv1(): string;
```

## `js/ws.js`

[Source Code](js/ws.js)

### Description

RPC (Remote Procedure Call) over WebSockets.

### Imports

```js
import { obj } from './elvis.js'
```

### Exports

```ts
export function ws(urls: string[], onReconnect: (send: (data: any) => Promise<void>) => Promise<void>, reconnectDelay?: number | null): Promise<(data: any) => Promise<void>>;
```

## `style.js/chess.style.js`

[Source Code](style.js/chess.style.js) • [Demo](https://jackens.github.io/app/chess/)

### Description

Styles for simple chess application showing attack/defense counters.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const chessStyle: HTMLStyleElement;
```

## `style.js/jc.style.js`

[Source Code](style.js/jc.style.js) • [Unit Tests](test.js/jc.test.js)

### Description

CSS rules for `jc` converter in `JS2CSS` format — component styles and component layout system.

The component layout system contains only two types of classes:

- `.w-«w»-«sw»`: width  of `«w»` slots when the screen is **wide** enough for `«sw»` slots.
- `.h-«h»-«sw»`: height of `«h»` slots when the screen is **wide** enough for `«sw»` slots.

The minimum slot width is 200 pixels.

Example. Components defined as follows:

```js
import { $ } from '../js/$.js'
import { jc } from '../js/jc.js'
import { jcStyle } from '../style.js/jc.style.js'

window.onload = () => $({
  e: document.body,
  i: [{ e: jcStyle }, jc({
    label: 'Component #1', class: 'jc w-1-3 w-1-2', text: 'jc w-1-3 w-1-2'
  }), jc({
    label: 'Component #2', class: 'jc w-1-3 w-1-2', text: 'jc w-1-3 w-1-2'
  }), jc({
    label: 'Component #3', class: 'jc w-1-3', text: 'jc w-1-3'
  })]
})
```

on a screen at least 600 pixels wide, will be arranged on a single line:

![](https://jackens.github.io/png/jc-css-1.png)

on a screen less than 600 pixels wide, but not less than 400 pixels wide, will be arranged in two lines:

![](https://jackens.github.io/png/jc-css-2.png)

while on a screen less than 400 pixels wide, they will be arranged in three rows:

![](https://jackens.github.io/png/jc-css-3.png)

### Imports

```js
import { EMPTY_STRING } from '../js/common.js'
import { style } from '../js/style.js'
```

### Exports

```ts
export const jcStyle: HTMLStyleElement;
```

## `style.js/mdtp.style.js`

[Source Code](style.js/mdtp.style.js) • [Demo](https://jackens.github.io/app/mdtp/)

### Description

Styles for blogging platform based on Markdown and $\KaTeX$.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const mdtpStyle: HTMLStyleElement;
```

## `style.js/nogi-stonogi.style.js`

[Source Code](style.js/nogi-stonogi.style.js) • [Demo](https://jackens.github.io/app/nogi-stonogi/)

### Description

Styles for best strategy provider for “Nogi stonogi” board game.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const nogiStonogiStyle: HTMLStyleElement;
```

## `style.js/pink-painter.style.js`

[Source Code](style.js/pink-painter.style.js) • [Demo](https://jackens.github.io/app/pink-painter/)

### Description

Style for “Pink Painter” puzzle game.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const pinkPainterStyle: HTMLStyleElement;
```

## `style.js/preloader.style.js`

[Source Code](style.js/preloader.style.js)

### Description

Styles for animated gear preloader.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const preloaderStyle: HTMLStyleElement;
```

## `style.js/todo-page.style.js`

[Source Code](style.js/todo-page.style.js)

### Description

Styles for simple self-hosted Trello alternative.

### Imports

```js
import { style } from '../js/style.js'
```

### Exports

```ts
export const CLASS_TODO_LIST: "todo-list";
export const CLASS_TODO_TASK: "todo-task";
export const CLASS_TODO_TASKS: "todo-tasks";
export const LIST_WIDTH: 300;
export const PADDING: 5;
export const todoPageStyle: HTMLStyleElement;
```

## License

MIT License

Copyright (c) 2021+ Jackens

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
