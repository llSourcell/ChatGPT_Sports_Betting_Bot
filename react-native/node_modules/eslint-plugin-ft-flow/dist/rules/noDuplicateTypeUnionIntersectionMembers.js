"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var create = function create(context) {
  var sourceCode = context.getSourceCode();

  var _ref = context.options[1] || {},
      _ref$checkIntersectio = _ref.checkIntersections,
      checkIntersections = _ref$checkIntersectio === void 0 ? true : _ref$checkIntersectio,
      _ref$checkUnions = _ref.checkUnions,
      checkUnions = _ref$checkUnions === void 0 ? true : _ref$checkUnions;

  var checkForDuplicates = function checkForDuplicates(node) {
    var uniqueMembers = [];
    var duplicates = [];
    var source = node.types.map(function (type) {
      return {
        node: type,
        text: sourceCode.getText(type)
      };
    });
    var hasComments = node.types.some(function (type) {
      var count = sourceCode.getCommentsBefore(type).length + sourceCode.getCommentsAfter(type).length;
      return count > 0;
    });

    var fix = function fix(fixer) {
      var result = uniqueMembers.map(function (t) {
        return t.text;
      }).join(node.type === 'UnionTypeAnnotation' ? ' | ' : ' & ');
      return fixer.replaceText(node, result);
    };

    var _iterator = _createForOfIteratorHelper(source),
        _step;

    try {
      var _loop = function _loop() {
        var member = _step.value;
        var match = uniqueMembers.find(function (uniqueMember) {
          return uniqueMember.text === member.text;
        });

        if (match) {
          duplicates.push(member);
        } else {
          uniqueMembers.push(member);
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

    for (var _i = 0, _duplicates = duplicates; _i < _duplicates.length; _i++) {
      var duplicate = _duplicates[_i];
      context.report(_objectSpread({
        data: {
          name: duplicate.text,
          type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection'
        },
        messageId: 'duplicate',
        node: node
      }, hasComments ? {
        suggest: [{
          fix: fix,
          messageId: 'suggestFix'
        }]
      } : {
        fix: fix
      }));
    }
  };

  return {
    IntersectionTypeAnnotation: function IntersectionTypeAnnotation(node) {
      if (checkIntersections === true) {
        checkForDuplicates(node);
      }
    },
    UnionTypeAnnotation: function UnionTypeAnnotation(node) {
      if (checkUnions === true) {
        checkForDuplicates(node);
      }
    }
  };
};

var _default = {
  create: create,
  meta: {
    fixable: 'code',
    messages: {
      duplicate: 'Duplicate {{type}} member found "{{name}}".',
      suggestFix: 'Remove duplicate members of type (removes all comments).'
    },
    schema: [{
      properties: {
        checkIntersections: {
          type: 'boolean'
        },
        checkUnions: {
          type: 'boolean'
        }
      },
      type: 'object'
    }]
  }
};
exports["default"] = _default;
module.exports = exports.default;