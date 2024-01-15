"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaults = {
  annotationStyle: 'none',
  strict: false
};

var looksLikeFlowFileAnnotation = function looksLikeFlowFileAnnotation(comment) {
  return /@(?:no)?flo/i.test(comment);
};

var isValidAnnotationStyle = function isValidAnnotationStyle(node, style) {
  if (style === 'none') {
    return true;
  }

  return style === node.type.toLowerCase();
};

var checkAnnotationSpelling = function checkAnnotationSpelling(comment) {
  return /@[a-z]+\b/.test(comment) && (0, _utilities.fuzzyStringMatch)(comment.replace(/no/i, ''), '@flow', 0.2);
};

var isFlowStrict = function isFlowStrict(comment) {
  return /^@flow[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]strict\b/.test(comment);
};

var noFlowAnnotation = function noFlowAnnotation(comment) {
  return /^@noflow\b/.test(comment);
};

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    annotationStyle: {
      "enum": ['none', 'line', 'block'],
      type: 'string'
    },
    strict: {
      "enum": [true, false],
      type: 'boolean'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  var always = context.options[0] === 'always';

  var style = _lodash["default"].get(context, 'options[1].annotationStyle', defaults.annotationStyle);

  var flowStrict = _lodash["default"].get(context, 'options[1].strict', defaults.strict);

  return {
    Program: function Program(node) {
      var firstToken = node.tokens[0];

      var potentialFlowFileAnnotation = _lodash["default"].find(context.getSourceCode().getAllComments(), function (comment) {
        return looksLikeFlowFileAnnotation(comment.value);
      });

      if (potentialFlowFileAnnotation) {
        if (firstToken && firstToken.range[0] < potentialFlowFileAnnotation.range[0]) {
          context.report({
            message: 'Flow file annotation not at the top of the file.',
            node: potentialFlowFileAnnotation
          });
        }

        var annotationValue = potentialFlowFileAnnotation.value.trim();

        if ((0, _utilities.isFlowFileAnnotation)(annotationValue)) {
          if (!isValidAnnotationStyle(potentialFlowFileAnnotation, style)) {
            var annotation = style === 'line' ? "// ".concat(annotationValue) : "/* ".concat(annotationValue, " */");
            context.report({
              fix: function fix(fixer) {
                return fixer.replaceTextRange([potentialFlowFileAnnotation.range[0], potentialFlowFileAnnotation.range[1]], annotation);
              },
              message: "Flow file annotation style must be `".concat(annotation, "`"),
              node: potentialFlowFileAnnotation
            });
          }

          if (!noFlowAnnotation(annotationValue) && flowStrict && !isFlowStrict(annotationValue)) {
            var str = style === 'line' ? '`// @flow strict`' : '`/* @flow strict */`';
            context.report({
              fix: function fix(fixer) {
                var annotation = ['line', 'none'].includes(style) ? '// @flow strict' : '/* @flow strict */';
                return fixer.replaceTextRange([potentialFlowFileAnnotation.range[0], potentialFlowFileAnnotation.range[1]], annotation);
              },
              message: "Strict Flow file annotation is required, must be ".concat(str),
              node: node
            });
          }
        } else if (checkAnnotationSpelling(annotationValue)) {
          context.report({
            message: 'Misspelled or malformed Flow file annotation.',
            node: potentialFlowFileAnnotation
          });
        } else {
          context.report({
            message: 'Malformed Flow file annotation.',
            node: potentialFlowFileAnnotation
          });
        }
      } else if (always && !_lodash["default"].get(context, 'settings[\'ft-flow\'].onlyFilesWithFlowAnnotation')) {
        context.report({
          fix: function fix(fixer) {
            var annotation;

            if (flowStrict) {
              annotation = ['line', 'none'].includes(style) ? '// @flow strict\n' : '/* @flow strict */\n';
            } else {
              annotation = ['line', 'none'].includes(style) ? '// @flow\n' : '/* @flow */\n';
            }

            var firstComment = node.comments[0];

            if (firstComment && firstComment.type === 'Shebang') {
              return fixer.replaceTextRange([firstComment.range[1], firstComment.range[1]], "\n".concat(annotation.trim()));
            }

            return fixer.replaceTextRange([node.range[0], node.range[0]], annotation);
          },
          message: 'Flow file annotation is missing.',
          node: node
        });
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