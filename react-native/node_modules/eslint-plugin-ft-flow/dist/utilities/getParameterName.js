"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(identifierNode, context) {
  if (_lodash["default"].has(identifierNode, 'name')) {
    return identifierNode.name;
  }

  if (_lodash["default"].has(identifierNode, 'left.name')) {
    return identifierNode.left.name;
  }

  if (_lodash["default"].has(identifierNode, 'key.name')) {
    return identifierNode.key.name;
  }

  if (identifierNode.type === 'RestElement') {
    return identifierNode.argument.name;
  }

  if (identifierNode.type === 'ObjectTypeProperty') {
    var tokenIndex;
    tokenIndex = 0;

    if (identifierNode["static"]) {
      tokenIndex += 1;
    }

    if (identifierNode.variance) {
      tokenIndex += 1;
    }

    if (identifierNode.kind === 'set' || identifierNode.kind === 'get') {
      tokenIndex += 1;
    }

    return context.getSourceCode().getFirstToken(identifierNode, tokenIndex).value;
  }

  if (identifierNode.type === 'ObjectTypeIndexer') {
    var _tokenIndex;

    _tokenIndex = 0;

    if (identifierNode["static"]) {
      _tokenIndex += 1;
    }

    if (identifierNode.variance) {
      _tokenIndex += 1;
    }

    _tokenIndex += 1;
    var id = context.getSourceCode().getFirstToken(identifierNode, _tokenIndex);
    var colonOrBrace = context.getSourceCode().getTokenAfter(id);

    if (colonOrBrace.value === ':') {
      return id.value;
    }

    return null;
  }

  if (identifierNode.type === 'FunctionTypeParam') {
    return context.getSourceCode().getFirstToken(identifierNode).value;
  }

  if (identifierNode.type === 'ObjectPattern' || identifierNode.type === 'ArrayPattern') {
    var text = context.getSourceCode().getText(identifierNode);

    if (identifierNode.typeAnnotation) {
      return text.replace(context.getSourceCode().getText(identifierNode.typeAnnotation), '').trim();
    }

    return text;
  }

  if (_lodash["default"].get(identifierNode, 'left.type') === 'ObjectPattern') {
    return context.getSourceCode().getText(identifierNode.left);
  }

  return null;
};

exports["default"] = _default;
module.exports = exports.default;