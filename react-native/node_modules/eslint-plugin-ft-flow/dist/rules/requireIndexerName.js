"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../utilities");

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  if (always) {
    return {
      ObjectTypeIndexer: function ObjectTypeIndexer(node) {
        var id = (0, _utilities.getParameterName)(node, context);
        var rawKeyType = context.getSourceCode().getText(node.key);

        if (id === null) {
          context.report({
            fix: function fix(fixer) {
              return fixer.replaceText(node.key, "key: ".concat(rawKeyType));
            },
            message: 'All indexers must be declared with key name.',
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
  meta: {
    fixable: 'code'
  },
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;