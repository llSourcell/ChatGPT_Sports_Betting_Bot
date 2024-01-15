"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(context, report) {
  var sourceCode = context.getSourceCode();
  return function (functionNode) {
    // skip FunctionTypeAnnotation, possibly another rule as it's an arrow, not a colon?
    // (foo: number) => string
    //              ^^^^
    if (functionNode.returnType && functionNode.type !== 'FunctionTypeAnnotation') {
      report({
        colon: sourceCode.getFirstToken(functionNode.returnType),
        node: functionNode,
        type: 'return type'
      });
    }
  };
};

exports["default"] = _default;
module.exports = exports.default;