"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [];

var create = function create(context) {
  var markTypeAsUsed = function markTypeAsUsed(node) {
    context.markVariableAsUsed(node.id.name);
  };

  var markTypeAsUsedWithGenericType = function markTypeAsUsedWithGenericType(node) {
    var typeId;
    var scope;
    var variable;

    if (node.id.type === 'Identifier') {
      typeId = node.id;
    } else if (node.id.type === 'QualifiedTypeIdentifier') {
      typeId = node.id;

      do {
        typeId = typeId.qualification;
      } while (typeId.qualification);
    }

    for (scope = context.getScope(); scope; scope = scope.upper) {
      variable = scope.set.get(typeId.name);

      if (variable && variable.defs.length) {
        context.markVariableAsUsed(typeId.name);
        break;
      }
    }
  };

  return {
    DeclareClass: markTypeAsUsed,
    DeclareFunction: markTypeAsUsed,
    DeclareModule: markTypeAsUsed,
    DeclareVariable: markTypeAsUsed,
    GenericTypeAnnotation: markTypeAsUsedWithGenericType,
    TypeParameterDeclaration: function TypeParameterDeclaration(node) {
      var _iterator = _createForOfIteratorHelper(node.params),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var param = _step.value;

          if (param["default"] && param["default"].typeParameters) {
            if (param["default"].type === 'GenericTypeAnnotation') {
              markTypeAsUsedWithGenericType(param["default"]);
            }

            var _iterator2 = _createForOfIteratorHelper(param["default"].typeParameters.params),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var typeParameterNode = _step2.value;

                if (typeParameterNode.type === 'GenericTypeAnnotation') {
                  markTypeAsUsedWithGenericType(typeParameterNode);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
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