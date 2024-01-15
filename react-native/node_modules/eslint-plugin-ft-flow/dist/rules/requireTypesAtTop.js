"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var always = (context.options[0] || 'always') === 'always';

  if (always) {
    var sourceCode = context.getSourceCode(); // nodes representing type and import declarations

    var ignoredNodes = [// import ...
    function (node) {
      return node.type === 'ImportDeclaration';
    }, // export type Foo = ...
    // export opaque type Foo = ...
    // export type Foo from ...
    // export opaque type Foo from ...
    function (node) {
      return node.type === 'ExportNamedDeclaration' && node.exportKind === 'type';
    }, // type Foo = ...
    function (node) {
      return node.type === 'TypeAlias';
    }, // opaque type Foo = ...
    function (node) {
      return node.type === 'OpaqueType';
    }];

    var isIgnoredNode = function isIgnoredNode(node) {
      var _iterator = _createForOfIteratorHelper(ignoredNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var predicate = _step.value;

          if (predicate(node)) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    };

    var regularCodeStartRange;

    var _iterator2 = _createForOfIteratorHelper(sourceCode.ast.body),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var node = _step2.value;

        if (!isIgnoredNode(node)) {
          regularCodeStartRange = node.range;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (!_lodash["default"].isArray(regularCodeStartRange)) {
      // a source with only ignored nodes
      return {};
    }

    return {
      'TypeAlias, OpaqueType': function TypeAliasOpaqueType(node) {
        if (node.range[0] > regularCodeStartRange[0]) {
          context.report({
            message: 'All type declaration must be at the top of the file, after any import declarations.',
            node: node
          });
        }
      }
    };
  }

  return {};
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;