"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['double', 'single'],
  type: 'string'
}];
var meta = {
  fixable: 'code'
};

var create = function create(context) {
  var _double = (context.options[0] || 'double') === 'double';

  var sourceCode = context.getSourceCode();
  return {
    StringLiteralTypeAnnotation: function StringLiteralTypeAnnotation(node) {
      if (_double && sourceCode.text[node.range[0]] !== '"') {
        // double
        context.report({
          fix: function fix(fixer) {
            return [fixer.replaceTextRange([node.range[0], node.range[0] + 1], '"'), fixer.replaceTextRange([node.range[1] - 1, node.range[1]], '"')];
          },
          message: 'String literals must use double quote.',
          node: node
        });
      } else if (!_double && sourceCode.text[node.range[0]] !== '\'') {
        // single
        context.report({
          fix: function fix(fixer) {
            return [fixer.replaceTextRange([node.range[0], node.range[0] + 1], '\''), fixer.replaceTextRange([node.range[1] - 1, node.range[1]], '\'')];
          },
          message: 'String literals must use single quote.',
          node: node
        });
      }
    }
  };
};

var _default = {
  create: create,
  meta: meta,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;