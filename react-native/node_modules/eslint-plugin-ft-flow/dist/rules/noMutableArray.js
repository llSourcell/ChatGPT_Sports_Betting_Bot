"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = []; // const x = [];

var isEmptyArrayLiteral = function isEmptyArrayLiteral(node) {
  return _lodash["default"].get(node, 'init.type') === 'ArrayExpression' && _lodash["default"].get(node, 'init.elements.length') === 0;
}; // const x = new Array(); const y = Array();


var isEmptyArrayInstance = function isEmptyArrayInstance(node) {
  if (_lodash["default"].get(node, 'init.type') === 'NewExpression' || _lodash["default"].get(node, 'init.type') === 'CallExpression') {
    return _lodash["default"].get(node, 'init.callee.name') === 'Array' && _lodash["default"].get(node, 'init.arguments.length') === 0;
  }

  return false;
};

var isAnnotationOfEmptyArrayInit = function isAnnotationOfEmptyArrayInit(node) {
  if (_lodash["default"].has(node, 'parent.parent.parent')) {
    var parent = _lodash["default"].get(node, 'parent.parent.parent');

    var isVariableDeclaration = _lodash["default"].get(parent, 'type') === 'VariableDeclarator';
    return isVariableDeclaration && (isEmptyArrayLiteral(parent) || isEmptyArrayInstance(parent));
  }

  return false;
};

var create = function create(context) {
  return {
    ArrayTypeAnnotation: function ArrayTypeAnnotation(node) {
      if (!isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix: function fix(fixer) {
            var rawElementType = context.getSourceCode().getText(node.elementType);
            return fixer.replaceText(node, "$ReadOnlyArray<".concat(rawElementType, ">"));
          },
          message: 'Use "$ReadOnlyArray" instead of array shorthand notation',
          node: node
        });
      }
    },
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      if (node.id.name === 'Array' && !isAnnotationOfEmptyArrayInit(node)) {
        context.report({
          fix: function fix(fixer) {
            return fixer.replaceText(node.id, '$ReadOnlyArray');
          },
          message: 'Use "$ReadOnlyArray" instead of "Array"',
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