"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [];

var create = function create(context) {
  return {
    MixedTypeAnnotation: function MixedTypeAnnotation(node) {
      context.report({
        message: 'Unexpected use of mixed type',
        node: node
      });
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;