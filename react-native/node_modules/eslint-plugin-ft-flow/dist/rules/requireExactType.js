"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];
var meta = {
  fixable: 'code'
};

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';
  var sourceCode = context.getSourceCode();
  return {
    ObjectTypeAnnotation: function ObjectTypeAnnotation(node) {
      var exact = node.exact,
          indexers = node.indexers,
          inexact = node.inexact;

      if (!['DeclareClass', 'InterfaceDeclaration'].includes(node.parent.type) && always && !exact && !inexact && indexers.length === 0) {
        context.report({
          fix: function fix(fixer) {
            return [fixer.replaceText(sourceCode.getFirstToken(node), '{|'), fixer.replaceText(sourceCode.getLastToken(node), '|}')];
          },
          message: 'Object type must be exact.',
          node: node
        });
      }

      if (!always && exact) {
        context.report({
          fix: function fix(fixer) {
            return [fixer.replaceText(sourceCode.getFirstToken(node), '{'), fixer.replaceText(sourceCode.getLastToken(node), '}')];
          },
          message: 'Object type must not be exact.',
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