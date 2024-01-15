"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  type: 'string'
}];
var message = '$FlowFixMe is treated as \'any\' and must be fixed.';

var isIdentifier = function isIdentifier(node, name) {
  return node && node.type === 'Identifier' && node.name.match(name);
};

var create = function create(context) {
  var allowedPattern = context.options[0] ? new RegExp(context.options[0], 'u') : null;
  var extraMessage = allowedPattern ? " Fix it or match '".concat(allowedPattern.toString(), "'.") : '';

  var passesExtraRegex = function passesExtraRegex(value) {
    if (!allowedPattern) {
      return false;
    }

    return value.match(allowedPattern);
  };

  var handleComment = function handleComment(comment) {
    var value = comment.value.trim();

    if (/\$FlowFixMe/.test(value) && !passesExtraRegex(value)) {
      context.report({
        message: message + extraMessage,
        node: comment
      });
    }
  };

  return {
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      if (isIdentifier(node.id, /\$FlowFixMe/)) {
        context.report({
          message: message,
          node: node.id
        });
      }
    },
    Program: function Program() {
      var _iterator = _createForOfIteratorHelper(context.getSourceCode().getAllComments().filter(function (node) {
        return node.type === 'Block' || node.type === 'Line';
      })),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var comment = _step.value;
          handleComment(comment);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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