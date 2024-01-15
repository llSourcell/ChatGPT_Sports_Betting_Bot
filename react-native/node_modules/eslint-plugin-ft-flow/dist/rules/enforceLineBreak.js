"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [];

var breakLineMessage = function breakLineMessage(direction) {
  return "New line required ".concat(direction, " type declaration");
};

var create = function create(context) {
  return {
    TypeAlias: function TypeAlias(node) {
      var sourceCode = context.getSourceCode();

      if (sourceCode.lines.length === 1) {
        return;
      }

      var exportedType = node.parent.type === 'ExportNamedDeclaration';
      var leadingComments = sourceCode.getCommentsBefore(exportedType ? node.parent : node);
      var hasLeadingComments = leadingComments.length > 0;

      if (node.loc.start.line !== 1) {
        if (hasLeadingComments && leadingComments[0].loc.start.line !== 1) {
          var lineAboveComment = sourceCode.lines[leadingComments[0].loc.start.line - 2];

          if (lineAboveComment !== '') {
            context.report({
              fix: function fix(fixer) {
                return fixer.insertTextBeforeRange(leadingComments[0].range, '\n');
              },
              message: breakLineMessage('above'),
              node: node
            });
          }
        } else if (!hasLeadingComments) {
          var isLineAbove = sourceCode.lines[node.loc.start.line - 2];

          if (isLineAbove !== '') {
            context.report({
              fix: function fix(fixer) {
                return fixer.insertTextBefore(exportedType ? node.parent : node, '\n');
              },
              message: breakLineMessage('above'),
              node: node
            });
          }
        }
      }

      if (sourceCode.lines.length !== node.loc.end.line) {
        var isLineBelow = sourceCode.lines[node.loc.end.line];

        if (isLineBelow !== '') {
          context.report({
            fix: function fix(fixer) {
              return fixer.insertTextAfter(node, '\n');
            },
            message: breakLineMessage('below'),
            node: node
          });
        }
      }
    }
  };
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