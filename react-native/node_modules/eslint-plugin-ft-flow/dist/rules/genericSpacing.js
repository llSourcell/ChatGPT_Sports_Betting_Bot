"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../utilities");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var sourceCode = context.getSourceCode();
  var never = (context.options[0] || 'never') === 'never';
  return {
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      var types = node.typeParameters; // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)

      if (!types) {
        return;
      }

      var _sourceCode$getFirstT = sourceCode.getFirstTokens(types, 2),
          _sourceCode$getFirstT2 = _slicedToArray(_sourceCode$getFirstT, 2),
          opener = _sourceCode$getFirstT2[0],
          firstInnerToken = _sourceCode$getFirstT2[1];

      var _sourceCode$getLastTo = sourceCode.getLastTokens(types, 2),
          _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
          lastInnerToken = _sourceCode$getLastTo2[0],
          closer = _sourceCode$getLastTo2[1];

      var spacesBefore = firstInnerToken.range[0] - opener.range[1];
      var spacesAfter = closer.range[0] - lastInnerToken.range[1];

      if (never) {
        if (spacesBefore) {
          var whiteSpaceBefore = sourceCode.text[opener.range[1]];

          if (whiteSpaceBefore !== '\n' && whiteSpaceBefore !== '\r') {
            context.report({
              data: {
                name: node.id.name
              },
              fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore),
              message: 'There must be no space at start of "{{name}}" generic type annotation',
              node: types
            });
          }
        }

        if (spacesAfter) {
          var whiteSpaceAfter = sourceCode.text[closer.range[0] - 1];

          if (whiteSpaceAfter !== '\n' && whiteSpaceAfter !== '\r') {
            context.report({
              data: {
                name: node.id.name
              },
              fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter),
              message: 'There must be no space at end of "{{name}}" generic type annotation',
              node: types
            });
          }
        }
      } else {
        if (spacesBefore > 1) {
          context.report({
            data: {
              name: node.id.name
            },
            fix: _utilities.spacingFixers.stripSpacesAfter(opener, spacesBefore - 1),
            message: 'There must be one space at start of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesBefore === 0) {
          context.report({
            data: {
              name: node.id.name
            },
            fix: _utilities.spacingFixers.addSpaceAfter(opener),
            message: 'There must be a space at start of "{{name}}" generic type annotation',
            node: types
          });
        }

        if (spacesAfter > 1) {
          context.report({
            data: {
              name: node.id.name
            },
            fix: _utilities.spacingFixers.stripSpacesAfter(lastInnerToken, spacesAfter - 1),
            message: 'There must be one space at end of "{{name}}" generic type annotation',
            node: types
          });
        } else if (spacesAfter === 0) {
          context.report({
            data: {
              name: node.id.name
            },
            fix: _utilities.spacingFixers.addSpaceAfter(lastInnerToken),
            message: 'There must be a space at end of "{{name}}" generic type annotation',
            node: types
          });
        }
      }
    }
  };
};

var meta = {
  fixable: 'whitespace'
};
var _default = {
  create: create,
  meta: meta,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;