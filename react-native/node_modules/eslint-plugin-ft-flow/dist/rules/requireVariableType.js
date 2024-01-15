"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    excludeVariableMatch: {
      type: 'string'
    },
    excludeVariableTypes: {
      additionalProperties: false,
      properties: {
        "const": {
          type: 'boolean'
        },
        "let": {
          type: 'boolean'
        },
        "var": {
          type: 'boolean'
        }
      },
      type: 'object'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var checkThisFile = !_lodash["default"].get(context, 'settings[\'ft-flow\'].onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

  if (!checkThisFile) {
    return function () {};
  }

  var excludeVariableMatch = new RegExp(_lodash["default"].get(context, 'options[0].excludeVariableMatch', 'a^'), 'u');

  var excludeVariableTypes = _lodash["default"].get(context, 'options[0].excludeVariableTypes', {});

  return {
    VariableDeclaration: function VariableDeclaration(variableDeclaration) {
      var variableType = _lodash["default"].get(variableDeclaration, 'kind');

      if (_lodash["default"].get(excludeVariableTypes, variableType)) {
        return;
      }

      _lodash["default"].forEach(variableDeclaration.declarations, function (variableDeclarator) {
        var identifierNode = _lodash["default"].get(variableDeclarator, 'id');

        var identifierName = _lodash["default"].get(identifierNode, 'name');

        if (excludeVariableMatch.test(identifierName)) {
          return;
        }

        var typeAnnotation = _lodash["default"].get(identifierNode, 'typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: (0, _utilities.quoteName)(identifierName)
            },
            message: 'Missing {{name}}variable type annotation.',
            node: identifierNode
          });
        }
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