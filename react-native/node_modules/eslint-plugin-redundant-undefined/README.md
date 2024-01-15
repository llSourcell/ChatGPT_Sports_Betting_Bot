# eslint-plugin-redundant-undefined

> Forbids optional parameters to include an explicit `undefined` in their type and requires to use `undefined` in optional properties.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/a-tarasyuk/eslint-plugin-redundant-undefined/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/eslint-plugin-redundant-undefined.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-redundant-undefined) ![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/a-tarasyuk/eslint-plugin-redundant-undefined/main.yml?style=flat-square) [![Coverage Status](https://img.shields.io/coveralls/github/a-tarasyuk/eslint-plugin-redundant-undefined?style=flat-square)](https://coveralls.io/github/a-tarasyuk/eslint-plugin-redundant-undefined?branch=main) [![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-redundant-undefined.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-redundant-undefined)

## Installation

```
$ npm i eslint-plugin-redundant-undefined @typescript-eslint/parser --save-dev
```

## Usage

Add `redundant-undefined` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["redundant-undefined"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "redundant-undefined/redundant-undefined": "error"
  }
}
```

## Rule Details

- Avoid explicitly specifying `undefined` as a type for a parameter/property which is already optional

### Options

- `followExactOptionalPropertyTypes` - Requires explicitly specifying `undefined` as a type for a parameter which is already optional., this provides the correct semantics for people who have [`exactOptionalPropertyType: true`](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes)

### Examples

Examples of **incorrect** code:

```ts
function f(s?: undefined | string): void {}

function f(s?: number | undefined | string): void {}

interface I {
  a?: string | undefined;
}

class C {
  a?: string | undedined;
}
```

Examples of **correct** code:

```ts
function f(s?: string): void {}

interface I {
  a?: string;
}

interface I {
  a?: any;
}

class C {
  a?: string;
}
```

Examples of **incorrect** code for the `{ "followExactOptionalPropertyTypes": true }`:

```ts
interface I {
  p?: string;
}

class C {
  private p?: number;
}

abstract class C {
  abstract p?: string;
}
```

Examples of **correct** code for the `{ "followExactOptionalPropertyTypes": true }`:

```ts
interface I {
  p?: string | undefined;
}

interface I {
  p?: any;
}

class C {
  private p?: number | undefined;
}

abstract class C {
  abstract p?: string | undefined;
}
```

## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/a-tarasyuk/redundant-undefined/blob/master/LICENSE.md).
