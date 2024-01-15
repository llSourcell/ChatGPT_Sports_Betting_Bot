"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../utilities");

/**
 * Disallows the use for flow types without a valid file annotation.
 * Only checks files without a valid flow annotation.
 */
var schema = [];

var create = function create(context) {
  // Skip flow files
  if ((0, _utilities.isFlowFile)(context, false)) {
    return {};
  }

  var reporter = function reporter(node, type) {
    context.report({
      data: {
        type: type
      },
      message: 'Type {{type}} require valid Flow declaration.',
      node: node
    });
  };

  return {
    ExportNamedDeclaration: function ExportNamedDeclaration(node) {
      if (node.exportKind === 'type') {
        reporter(node, 'exports');
      }
    },
    ImportDeclaration: function ImportDeclaration(node) {
      if (node.importKind === 'type') {
        reporter(node, 'imports');
      }

      if (node.importKind === 'value' && node.specifiers.some(function (specifier) {
        return specifier.importKind === 'type';
      })) {
        reporter(node, 'imports');
      }
    },
    TypeAlias: function TypeAlias(node) {
      reporter(node, 'aliases');
    },
    TypeAnnotation: function TypeAnnotation(node) {
      reporter(node, 'annotations');
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;