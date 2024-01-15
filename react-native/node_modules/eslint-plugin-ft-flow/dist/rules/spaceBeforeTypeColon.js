"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeColonSpacing = _interopRequireDefault(require("./typeColonSpacing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  return (0, _typeColonSpacing["default"])('before', context, {
    always: context.options[0] === 'always'
  });
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