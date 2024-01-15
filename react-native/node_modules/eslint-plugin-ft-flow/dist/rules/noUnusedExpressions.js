"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getBuiltinRule = require("../utilities/getBuiltinRule");

// A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.
var noUnusedExpressionsRule = (0, _getBuiltinRule.getBuiltinRule)('no-unused-expressions');
var meta = noUnusedExpressionsRule.meta;

var create = function create(context) {
  var coreChecks = noUnusedExpressionsRule.create(context);
  return {
    ExpressionStatement: function ExpressionStatement(node) {
      if (node.expression.type === 'TypeCastExpression' || node.expression.type === 'OptionalCallExpression') {
        return;
      }

      coreChecks.ExpressionStatement(node);
    }
  };
};

var _default = {
  create: create,
  meta: meta
};
exports["default"] = _default;
module.exports = exports.default;