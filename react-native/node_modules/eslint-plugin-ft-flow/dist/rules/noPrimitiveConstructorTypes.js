"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = [];

var create = function create(context) {
  var regex = /^(Boolean|Number|String)$/;
  return {
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      var name = _lodash["default"].get(node, 'id.name');

      if (regex.test(name)) {
        context.report({
          data: {
            name: name
          },
          loc: node.loc,
          message: 'Unexpected use of {{name}} constructor type.',
          node: node
        });
      }
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;