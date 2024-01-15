"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(iterator) {
  return function (context) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var nodeIterator = iterator.apply(void 0, [context].concat(rest));
    return {
      ArrowFunctionExpression: nodeIterator,
      FunctionDeclaration: nodeIterator,
      FunctionExpression: nodeIterator,
      FunctionTypeAnnotation: nodeIterator
    };
  };
};

exports["default"] = _default;
module.exports = exports.default;