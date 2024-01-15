"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _evaluateFunctions = _interopRequireDefault(require("./evaluateFunctions"));

var _evaluateObjectTypeIndexer = _interopRequireDefault(require("./evaluateObjectTypeIndexer"));

var _evaluateObjectTypeProperty = _interopRequireDefault(require("./evaluateObjectTypeProperty"));

var _evaluateTypeCastExpression = _interopRequireDefault(require("./evaluateTypeCastExpression"));

var _evaluateTypical = _interopRequireDefault(require("./evaluateTypical"));

var _evaluateVariables = _interopRequireDefault(require("./evaluateVariables"));

var _reporter = _interopRequireDefault(require("./reporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(direction, context, options) {
  var report = (0, _reporter["default"])(direction, context, options);
  return _objectSpread(_objectSpread({}, (0, _evaluateFunctions["default"])(context, report)), {}, {
    ClassProperty: (0, _evaluateTypical["default"])(context, report, 'class property'),
    PropertyDefinition: (0, _evaluateTypical["default"])(context, report, 'class property'),
    ObjectTypeIndexer: (0, _evaluateObjectTypeIndexer["default"])(context, report),
    ObjectTypeProperty: (0, _evaluateObjectTypeProperty["default"])(context, report),
    TypeCastExpression: (0, _evaluateTypeCastExpression["default"])(context, report),
    VariableDeclaration: (0, _evaluateVariables["default"])(context, report)
  });
};

exports["default"] = _default;
module.exports = exports.default;