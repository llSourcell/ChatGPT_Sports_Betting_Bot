"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuiltinRule = void 0;

/**
 * This is used to pull the definition of a builtin rule from eslint.
 *
 * Adopted from https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/utils/get-builtin-rule.js.
 */
var getBuiltinRule = function getBuiltinRule(id) {
  // TODO: Remove this when we drop support for ESLint 7
  var eslintVersion = require('eslint/package.json').version;

  if (eslintVersion.startsWith('7.')) {
    return require("eslint/lib/rules/".concat(id));
  } // In eslint 8 and beyond using https://nodejs.org/api/packages.html#subpath-exports
  // eslint has defined public exported paths and has locked the rest of the
  // directory as private.
  //
  // Though there is an issue when run with `jest` apparently where it does not support ESM.
  // So we're gonna do it the same old fashion way if it crashes when requiring.
  // ref: https://github.com/typescript-eslint/typescript-eslint/issues/4210#issuecomment-981203332


  try {
    // eslint-disable-next-line import/no-unresolved
    return require('eslint/use-at-your-own-risk').builtinRules.get(id);
  } catch (e) {
    return require("eslint/lib/rules/".concat(id));
  }
};

exports.getBuiltinRule = getBuiltinRule;