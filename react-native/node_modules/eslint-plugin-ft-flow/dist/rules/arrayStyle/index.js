"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isSimpleType = _interopRequireDefault(require("./isSimpleType"));

var _needWrap = _interopRequireDefault(require("./needWrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = [{
  "enum": ['verbose', 'shorthand'],
  type: 'string'
}];

var inlineType = function inlineType(type) {
  var inlined = type.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');

  if (inlined.length <= 50) {
    return inlined;
  }

  return 'Type';
};

var _default = function _default(defaultConfig, simpleType) {
  var create = function create(context) {
    var verbose = (context.options[0] || defaultConfig) === 'verbose';
    return {
      // shorthand
      ArrayTypeAnnotation: function ArrayTypeAnnotation(node) {
        var rawElementType = context.getSourceCode().getText(node.elementType);
        var inlinedType = inlineType(rawElementType);
        var wrappedInlinedType = (0, _needWrap["default"])(node.elementType) ? "(".concat(inlinedType, ")") : inlinedType;

        if ((0, _isSimpleType["default"])(node.elementType) === simpleType && verbose) {
          context.report({
            data: {
              type: inlinedType,
              wrappedType: wrappedInlinedType
            },
            fix: function fix(fixer) {
              return fixer.replaceText(node, "Array<".concat(rawElementType, ">"));
            },
            message: 'Use "Array<{{ type }}>", not "{{ wrappedType }}[]"',
            node: node
          });
        }
      },
      // verbose
      GenericTypeAnnotation: function GenericTypeAnnotation(node) {
        // Don't report on un-parameterized Array annotations. There are valid cases for this,
        // but regardless, we must NOT crash when encountering them.
        if (node.id.name === 'Array' && node.typeParameters && node.typeParameters.params.length === 1) {
          var elementTypeNode = node.typeParameters.params[0];
          var rawElementType = context.getSourceCode().getText(elementTypeNode);
          var inlinedType = inlineType(rawElementType);
          var wrappedInlinedType = (0, _needWrap["default"])(elementTypeNode) ? "(".concat(inlinedType, ")") : inlinedType;

          if ((0, _isSimpleType["default"])(elementTypeNode) === simpleType && !verbose) {
            context.report({
              data: {
                type: inlinedType,
                wrappedType: wrappedInlinedType
              },
              fix: function fix(fixer) {
                if ((0, _needWrap["default"])(elementTypeNode)) {
                  return fixer.replaceText(node, "(".concat(rawElementType, ")[]"));
                }

                return fixer.replaceText(node, "".concat(rawElementType, "[]"));
              },
              message: 'Use "{{ wrappedType }}[]", not "Array<{{ type }}>"',
              node: node
            });
          }
        }
      }
    };
  };

  return {
    create: create,
    meta: {
      fixable: 'code'
    },
    schema: schema
  };
};

exports["default"] = _default;
module.exports = exports.default;