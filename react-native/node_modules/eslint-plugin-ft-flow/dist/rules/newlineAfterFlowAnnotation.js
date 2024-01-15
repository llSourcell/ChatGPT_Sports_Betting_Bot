"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return /@(?:no)?flo/i.test(comment);
};

var schema = [{
  "enum": ['always', 'always-windows', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var mode = context.options[0];
  var never = mode === 'never';
  var newline = mode === 'always-windows' ? '\r\n' : '\n';
  return {
    Program: function Program(node) {
      var sourceCode = context.getSourceCode();

      var potentialFlowFileAnnotation = _lodash["default"].find(context.getSourceCode().getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        var line = potentialFlowFileAnnotation.loc.end.line;
        var nextLineIsEmpty = sourceCode.lines[line] === '';

        if (!never && !nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              return fixer.insertTextAfter(potentialFlowFileAnnotation, newline);
            },
            message: 'Expected newline after flow annotation',
            node: node
          });
        }

        if (never && nextLineIsEmpty) {
          context.report({
            fix: function fix(fixer) {
              var lineBreak = sourceCode.text[potentialFlowFileAnnotation.range[1]];
              return fixer.replaceTextRange([potentialFlowFileAnnotation.range[1], potentialFlowFileAnnotation.range[1] + (lineBreak === '\r' ? 2 : 1)], '');
            },
            message: 'Expected no newline after flow annotation',
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