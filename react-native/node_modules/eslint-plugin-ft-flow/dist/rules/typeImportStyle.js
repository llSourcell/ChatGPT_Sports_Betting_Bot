"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  "enum": ['declaration', 'identifier'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    ignoreTypeDefault: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

var create = function create(context) {
  if (context.options[0] === 'declaration') {
    return {
      ImportDeclaration: function ImportDeclaration(node) {
        if (node.importKind !== 'type') {
          var _iterator = _createForOfIteratorHelper(node.specifiers),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var specifier = _step.value;

              if (specifier.importKind === 'type') {
                context.report({
                  message: 'Unexpected type import',
                  node: node
                });
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    };
  } // Default to 'identifier'


  var ignoreTypeDefault = context.options[1] && context.options[1].ignoreTypeDefault;
  var isInsideDeclareModule = false;
  return {
    DeclareModule: function DeclareModule() {
      isInsideDeclareModule = true;
    },
    'DeclareModule:exit': function DeclareModuleExit() {
      isInsideDeclareModule = false;
    },
    ImportDeclaration: function ImportDeclaration(node) {
      if (node.importKind !== 'type') {
        return;
      } // type specifiers are not allowed inside module declarations:
      // https://github.com/facebook/flow/issues/7609


      if (isInsideDeclareModule) {
        return;
      }

      if (ignoreTypeDefault && node.specifiers[0] && node.specifiers[0].type === 'ImportDefaultSpecifier') {
        return;
      }

      context.report({
        fix: function fix(fixer) {
          var imports = node.specifiers.map(function (specifier) {
            if (specifier.type === 'ImportDefaultSpecifier') {
              return "type default as ".concat(specifier.local.name);
            }

            if (specifier.imported.name === specifier.local.name) {
              return "type ".concat(specifier.local.name);
            }

            return "type ".concat(specifier.imported.name, " as ").concat(specifier.local.name);
          });
          var source = node.source.value;
          return fixer.replaceText(node, "import {".concat(imports.join(', '), "} from '").concat(source, "';"));
        },
        message: 'Unexpected "import type"',
        node: node
      });
    }
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