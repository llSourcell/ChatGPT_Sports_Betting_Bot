"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Types considered simple:
 *
 *  - primitive types
 *  - literal types
 *  - mixed and any types
 *  - generic types (such as Date, Promise<string>, $Keys<T>, etc.)
 *  - array type written in shorthand notation
 *
 * Types not considered simple:
 *
 *  - maybe type
 *  - function type
 *  - object type
 *  - tuple type
 *  - union and intersection types
 *
 * Reminder: if you change these semantics,
 *  don't forget to modify documentation of `array-style-...` rules
 */
var simpleTypePatterns = [/^(?:Any|Array|Boolean|Generic|Mixed|Number|String|Void)TypeAnnotation$/, /(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+LiteralTypeAnnotation$/];

var _default = function _default(node) {
  return simpleTypePatterns.some(function (pattern) {
    return pattern.test(node.type);
  });
};

exports["default"] = _default;
module.exports = exports.default;