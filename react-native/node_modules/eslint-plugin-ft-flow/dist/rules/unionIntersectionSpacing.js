"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../utilities");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var sourceCode = context.getSourceCode();
  var always = (context.options[0] || 'always') === 'always';

  var check = function check(node) {
    var _iterator = _createForOfIteratorHelper(node.types.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            type = _step$value[1];

        if (index + 1 === node.types.length) {
          continue;
        }

        var separator = (0, _utilities.getTokenAfterParens)(sourceCode, type);
        var endOfType = sourceCode.getTokenBefore(separator);
        var nextType = sourceCode.getTokenAfter(separator);
        var spaceBefore = separator.range[0] - endOfType.range[1];
        var spaceAfter = nextType.range[0] - separator.range[1];
        var data = {
          type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection'
        };

        if (always) {
          if (!spaceBefore) {
            context.report({
              data: data,
              fix: _utilities.spacingFixers.addSpaceAfter(endOfType),
              message: 'There must be a space before {{type}} type annotation separator',
              node: node
            });
          }

          if (!spaceAfter) {
            context.report({
              data: data,
              fix: _utilities.spacingFixers.addSpaceAfter(separator),
              message: 'There must be a space after {{type}} type annotation separator',
              node: node
            });
          }
        } else {
          if (spaceBefore) {
            context.report({
              data: data,
              fix: _utilities.spacingFixers.stripSpacesAfter(endOfType, spaceBefore),
              message: 'There must be no space before {{type}} type annotation separator',
              node: node
            });
          }

          if (spaceAfter) {
            context.report({
              data: data,
              fix: _utilities.spacingFixers.stripSpacesAfter(separator, spaceAfter),
              message: 'There must be no space after {{type}} type annotation separator',
              node: node
            });
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  return {
    IntersectionTypeAnnotation: check,
    UnionTypeAnnotation: check
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