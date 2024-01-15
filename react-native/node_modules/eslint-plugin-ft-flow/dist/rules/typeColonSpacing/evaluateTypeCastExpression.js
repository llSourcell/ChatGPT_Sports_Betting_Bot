"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(context, report) {
  var sourceCode = context.getSourceCode();
  return function (typeCastExpression) {
    report({
      colon: sourceCode.getFirstToken(typeCastExpression.typeAnnotation),
      node: typeCastExpression,
      type: 'type cast'
    });
  };
};

exports["default"] = _default;
module.exports = exports.default;