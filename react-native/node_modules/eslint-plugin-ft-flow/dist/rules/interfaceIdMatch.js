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

  var checkInterface = function checkInterface(interfaceDeclarationNode) {
    var interfaceIdentifierName = interfaceDeclarationNode.id.name;

    if (!pattern.test(interfaceIdentifierName)) {
      context.report({
        data: {
          name: interfaceIdentifierName,
          pattern: pattern.toString()
        },
        message: 'Interface identifier \'{{name}}\' does not match pattern \'{{pattern}}\'.',
        node: interfaceDeclarationNode
      });
    }
  };

  return {
    InterfaceDeclaration: checkInterface
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;