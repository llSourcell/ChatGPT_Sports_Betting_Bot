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
  var globalScope; // do nearly the same thing that eslint does for config globals
  // https://github.com/eslint/eslint/blob/v2.0.0/lib/eslint.js#L118-L194

  var makeDefined = function makeDefined(ident) {
    var ii; // start from the right since we're going to remove items from the array

    for (ii = globalScope.through.length - 1; ii >= 0; ii--) {
      var ref = globalScope.through[ii];

      if (ref.identifier.name === ident.name) {
        // use "__defineGeneric" since we don't have a reference to "escope.Variable"
        globalScope.__defineGeneric(ident.name, globalScope.set, globalScope.variables);

        var variable = globalScope.set.get(ident.name);
        variable.writeable = false; // "through" contains all references whose definition cannot be found
        // so we need to update references and remove the ones that were added

        globalScope.through.splice(ii, 1);
        ref.resolved = variable;
        variable.references.push(ref);
      }
    }
  }; // NOTE: For future contributors, if you ever need to add support for a new identifier,
  // use `Identifier(node) {}` to find out which identifiers should be handled.


  return {
    ClassImplements: function ClassImplements(node) {
      makeDefined(node.id);
    },
    DeclareInterface: function DeclareInterface(node) {
      makeDefined(node.id);
    },
    DeclareTypeAlias: function DeclareTypeAlias(node) {
      makeDefined(node.id);
    },
    EnumDeclaration: function EnumDeclaration(node) {
      makeDefined(node.id);
    },
    EnumDefaultedMember: function EnumDefaultedMember(node) {
      makeDefined(node.id);
    },
    EnumNumberMember: function EnumNumberMember(node) {
      makeDefined(node.id);
    },
    EnumStringMember: function EnumStringMember(node) {
      makeDefined(node.id);
    },
    GenericTypeAnnotation: function GenericTypeAnnotation(node) {
      if (node.id.type === 'Identifier') {
        makeDefined(node.id);
      } else if (node.id.type === 'QualifiedTypeIdentifier') {
        var qid;
        qid = node.id;

        do {
          qid = qid.qualification;
        } while (qid.qualification);

        makeDefined(qid);
      }
    },
    // Can be removed once https://github.com/babel/babel-eslint/pull/696 is published
    OpaqueType: function OpaqueType(node) {
      if (node.id.type === 'Identifier') {
        makeDefined(node.id);
      }
    },
    Program: function Program() {
      globalScope = context.getScope();
    },
    TypeParameterDeclaration: function TypeParameterDeclaration(node) {
      var _iterator = _createForOfIteratorHelper(node.params),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var param = _step.value;
          makeDefined(param);
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