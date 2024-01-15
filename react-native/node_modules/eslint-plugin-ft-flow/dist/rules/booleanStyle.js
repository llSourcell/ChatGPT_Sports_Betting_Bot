"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['bool', 'boolean'],
  type: 'string'
}];

var create = function create(context) {
  var longForm = (context.options[0] || 'boolean') === 'boolean';
  return {
    BooleanTypeAnnotation: function BooleanTypeAnnotation(node) {
      var diff = node.range[1] - node.range[0];

      if (longForm && diff === 4) {
        context.report({
          fix: function fix(fixer) {
            return fixer.replaceText(node, 'boolean');
          },
          message: 'Use "boolean", not "bool"',
          node: node
        });
      }

      if (!longForm && diff !== 4) {
        context.report({
          fix: function fix(fixer) {
            return fixer.replaceText(node, 'bool');
          },
          message: 'Use "bool", not "boolean"',
          node: node
        });
      }
    }
  };
};

var _default = {
  create: create,
  meta: {
    fixable: 'code'
  },
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;