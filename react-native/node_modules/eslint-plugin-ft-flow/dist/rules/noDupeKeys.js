"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash/"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var schema = [];

var create = function create(context) {
  var report = function report(node) {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node: node
    });
  };

  var analyzeElement = function analyzeElement(element) {
    var type = element.type;
    var value;

    switch (type) {
      case 'GenericTypeAnnotation':
        value = element.id.name;
        break;

      case 'ObjectTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = buildObjectStructure(element.properties);
        break;

      case 'TupleTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = buildArrayStructure(element.types);
        break;

      default:
        value = element.value;
        break;
    }

    return {
      type: type,
      value: value
    };
  };

  var buildArrayStructure = function buildArrayStructure(elements) {
    return _lodash["default"].map(elements, function (element) {
      return analyzeElement(element);
    });
  };

  var buildObjectStructure = function buildObjectStructure(properties) {
    return _lodash["default"].map(properties, function (property) {
      var element = analyzeElement(property.type === 'ObjectTypeSpreadProperty' ? property.argument : property.value);
      return _objectSpread(_objectSpread({}, element), {}, {
        name: (0, _utilities.getParameterName)(property, context)
      });
    });
  };

  var checkForDuplicates = function checkForDuplicates(node) {
    var haystack = []; // filter out complex object types, like ObjectTypeSpreadProperty

    var identifierNodes = _lodash["default"].filter(node.properties, {
      type: 'ObjectTypeProperty'
    });

    var _iterator = _createForOfIteratorHelper(identifierNodes),
        _step;

    try {
      var _loop = function _loop() {
        var identifierNode = _step.value;
        var needle = {
          name: (0, _utilities.getParameterName)(identifierNode, context)
        };

        if (identifierNode.value.type === 'FunctionTypeAnnotation') {
          needle.args = _lodash["default"].map(identifierNode.value.params, function (param) {
            return analyzeElement(param.typeAnnotation);
          });
        }

        var match = _lodash["default"].some(haystack, function (existingNeedle) {
          return _lodash["default"].isEqual(existingNeedle, needle);
        });

        if (match) {
          report(identifierNode);
        } else {
          haystack.push(needle);
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
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;