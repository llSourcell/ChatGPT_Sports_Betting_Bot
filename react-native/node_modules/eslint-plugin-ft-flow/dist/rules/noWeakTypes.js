"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = [{
  additionalProperties: false,
  properties: {
    any: {
      type: 'boolean'
    },
    Function: {
      type: 'boolean'
    },
    Object: {
      type: 'boolean'
    },
    suppressTypes: {
      items: {
        type: 'string'
      },
      type: 'array'
    }
  },
  type: 'object'
}];

var reportWeakType = function reportWeakType(context, weakType) {
  var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function (node) {
    context.report({
      data: {
        weakType: weakType
      },
      message: "Unexpected use of".concat(custom ? ' custom' : '', " weak type \"{{weakType}}\""),
      node: node
    });
  };
};

var genericTypeEvaluator = function genericTypeEvaluator(context, _ref) {
  var checkFunction = _ref.checkFunction,
      checkObject = _ref.checkObject,
      suppressTypes = _ref.suppressTypes;
  return function (node) {
    var name = _lodash["default"].get(node, 'id.name');

    if (checkFunction && name === 'Function' || checkObject && name === 'Object') {
      reportWeakType(context, name)(node);
    }

    if (suppressTypes.includes(name)) {
      reportWeakType(context, name, true)(node);
    }
  };
};

var create = function create(context) {
  var checkAny = _lodash["default"].get(context, 'options[0].any', true) === true;
  var checkFunction = _lodash["default"].get(context, 'options[0].Function', true) === true;
  var checkObject = _lodash["default"].get(context, 'options[0].Object', true) === true;

  var suppressTypes = _lodash["default"].get(context, 'options[0].suppressTypes', []);

  var checks = {};

  if (checkAny) {
    checks.AnyTypeAnnotation = reportWeakType(context, 'any');
  }

  if (checkFunction || checkObject || suppressTypes.length > 0) {
    checks.GenericTypeAnnotation = genericTypeEvaluator(context, {
      checkFunction: checkFunction,
      checkObject: checkObject,
      suppressTypes: suppressTypes
    });
  }

  return checks;
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;