"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  type: 'string'
}];

var create = function create(context) {
  var pattern = new RegExp(context.options[0] || '^([A-Z][a-z0-9]*)+Type$', 'u');

  var checkType = function checkType(typeAliasNode) {
    var typeIdentifierName = typeAliasNode.id.name;

    if (!pattern.test(typeIdentifierName)) {
      context.report({
        data: {
          name: typeIdentifierName,
          pattern: pattern.toString()
        },
        message: 'Type identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.',
        node: typeAliasNode
      });
    }
  };

  return {
    OpaqueType: checkType,
    TypeAlias: checkType
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;