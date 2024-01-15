"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    allowNull: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';
  var allowNull = !(context.options[1] && context.options[1].allowNull === false);

  if (always) {
    return {
      IntersectionTypeAnnotation: function IntersectionTypeAnnotation(node) {
        if (allowNull && node.types.length === 2 && (node.types[0].type === 'NullLiteralTypeAnnotation' || node.types[1].type === 'NullLiteralTypeAnnotation')) {
          return;
        }

        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All intersection types must be declared with named type alias.',
            node: node
          });
        }
      },
      UnionTypeAnnotation: function UnionTypeAnnotation(node) {
        if (allowNull && node.types.length === 2 && (node.types[0].type === 'NullLiteralTypeAnnotation' || node.types[1].type === 'NullLiteralTypeAnnotation')) {
          return;
        }

        if (node.parent.type !== 'TypeAlias') {
          context.report({
            message: 'All union types must be declared with named type alias.',
            node: node
          });
        }
      }
    };
  }

  return {};
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;