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

var FLOW_STRICT_MATCHER = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*@(?:no)?flow[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*strict(?:\x2Dlocal)?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/;

var isStrictFlowFile = function isStrictFlowFile(context) {
  return context.getAllComments().some(function (comment) {
    return FLOW_STRICT_MATCHER.test(comment.value);
  });
};

var message = 'No suppression comments are allowed in "strict" Flow files. Either remove the error suppression, or lower the strictness of this module.';
var schema = [{
  additionalProperties: false,
  properties: {},
  type: 'object'
}];

_utilities.suppressionTypes.forEach(function (o) {
  schema[0].properties[o] = {
    type: 'boolean'
  };
});

var create = function create(context) {
  var suppressionOptions = _lodash["default"].get(context, 'options[0]', {});

  if (!isStrictFlowFile(context)) {
    // Skip this file - nothing to check here
    return {};
  }

  return {
    Program: function Program() {
      var comments = context.getSourceCode().getAllComments().filter(function (node) {
        return node.type === 'Block' || node.type === 'Line';
      });

      var _iterator = _createForOfIteratorHelper(comments),
          _step;

      try {
        var _loop = function _loop() {
          var commentNode = _step.value;
          var comment = commentNode.value.trimStart();

          var match = _utilities.suppressionTypes.some(function (prefix) {
            if (suppressionOptions[prefix] === false) return false;
            return comment.startsWith(prefix);
          });

          if (match) {
            context.report({
              message: message,
              node: commentNode
            });
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
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