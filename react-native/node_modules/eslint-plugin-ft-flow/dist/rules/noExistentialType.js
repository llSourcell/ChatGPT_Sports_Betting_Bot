"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Support both node types for existential type
// https://github.com/babel/babylon/issues/319
var reporter = function reporter(context) {
  return function (node) {
    context.report({
      message: 'Unexpected use of existential type (*).',
      node: node
    });
  };
};

var create = function create(context) {
  return {
    ExistentialTypeParam: reporter(context),
    ExistsTypeAnnotation: reporter(context)
  };
};

var _default = {
  create: create
};
exports["default"] = _default;
module.exports = exports.default;