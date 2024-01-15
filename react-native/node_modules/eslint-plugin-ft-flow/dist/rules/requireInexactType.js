"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';
  return {
    ObjectTypeAnnotation: function ObjectTypeAnnotation(node) {
      var inexact = node.inexact,
          exact = node.exact;

      if (!Object.prototype.hasOwnProperty.call(node, 'inexact')) {
        return;
      }

      if (always && !inexact && !exact) {
        context.report({
          message: 'Type must be explicit inexact.',
          node: node
        });
      }

      if (!always && inexact) {
        context.report({
          message: 'Type must not be explicit inexact.',
          node: node
        });
      }
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;