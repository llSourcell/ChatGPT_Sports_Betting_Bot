"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [];
var create = (0, _utilities.iterateFunctionNodes)(function (context) {
  return function (functionNode) {
    var _iterator = _createForOfIteratorHelper(functionNode.params),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var identifierNode = _step.value;

        var nodeType = _lodash["default"].get(identifierNode, 'type');

        var isAssignmentPattern = nodeType === 'AssignmentPattern';
        var hasTypeAnnotation = Boolean(_lodash["default"].get(identifierNode, 'typeAnnotation'));
        var leftAnnotated = Boolean(_lodash["default"].get(identifierNode, 'left.typeAnnotation'));

        if (isAssignmentPattern && hasTypeAnnotation && !leftAnnotated) {
          context.report({
            data: {
              name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(identifierNode, context))
            },
            message: '{{name}}parameter type annotation must be placed on left-hand side of assignment.',
            node: identifierNode
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
});
var _default = {
  create: create,
  meta: {
    deprecated: true
  },
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;