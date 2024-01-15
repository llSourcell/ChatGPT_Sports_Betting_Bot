"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../../utilities");

var hasLineBreak = function hasLineBreak(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.loc.start.line !== sourceCode.getTokenBefore(colon).loc.end.line;
  }

  return sourceCode.getTokenAfter(colon).loc.start.line !== colon.loc.end.line;
};

var getSpaces = function getSpaces(direction, colon, context) {
  var sourceCode = context.getSourceCode();

  if (direction === 'before') {
    return colon.range[0] - sourceCode.getTokenBefore(colon).range[1];
  }

  return sourceCode.getTokenAfter(colon).range[0] - colon.range[1];
};

var _default = function _default(direction, context, _ref) {
  var always = _ref.always,
      allowLineBreak = _ref.allowLineBreak;
  return function (_ref2) {
    var colon = _ref2.colon,
        node = _ref2.node,
        _ref2$name = _ref2.name,
        name = _ref2$name === void 0 ? '' : _ref2$name,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? 'type annotation' : _ref2$type;
    var lineBreak;
    var spaces; // Support optional names
    // type X = { [string]: a }
    // type X = string => string

    if (!colon || colon.value !== ':') {
      return;
    }

    var data = {
      direction: direction,
      name: name,
      type: type
    };

    if (hasLineBreak(direction, colon, context)) {
      if (allowLineBreak) {
        spaces = 1;
      } else {
        lineBreak = true;
        spaces = getSpaces(direction, colon, context);
      }
    } else {
      spaces = getSpaces(direction, colon, context);
    }

    if (always && lineBreak) {
      context.report({
        data: data,
        fix: _utilities.spacingFixers.replaceWithSpace(direction, colon, spaces),
        message: 'There must not be a line break {{direction}} {{name}}{{type}} colon.',
        node: node
      });
    } else if (always && spaces > 1) {
      context.report({
        data: data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces - 1),
        message: 'There must be 1 space {{direction}} {{name}}{{type}} colon.',
        node: node
      });
    } else if (always && spaces === 0) {
      context.report({
        data: data,
        fix: _utilities.spacingFixers.addSpace(direction, colon),
        message: 'There must be a space {{direction}} {{name}}{{type}} colon.',
        node: node
      });
    } else if (!always && spaces > 0) {
      context.report({
        data: data,
        fix: _utilities.spacingFixers.stripSpaces(direction, colon, spaces),
        message: 'There must be no space {{direction}} {{name}}{{type}} colon.',
        node: node
      });
    }
  };
};

exports["default"] = _default;
module.exports = exports.default;