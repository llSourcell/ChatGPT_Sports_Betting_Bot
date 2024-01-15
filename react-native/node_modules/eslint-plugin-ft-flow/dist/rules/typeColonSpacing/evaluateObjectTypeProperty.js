"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../../utilities");

var getColon = function getColon(context, objectTypeProperty) {
  var tokenIndex = 1;

  if (objectTypeProperty.optional) {
    tokenIndex += 1;
  }

  if (objectTypeProperty["static"]) {
    tokenIndex += 1;
  }

  if (objectTypeProperty.variance) {
    tokenIndex += 1;
  }

  return context.getSourceCode().getFirstToken(objectTypeProperty, tokenIndex);
}; // 1) type X = { foo(): A; }
// 2) type X = { foo: () => A; }
// the above have identical ASTs (save for their ranges)
// case 1 doesn't have a type annotation colon and must be ignored


var isShortPropertyFunction = function isShortPropertyFunction(objectTypeProperty) {
  return objectTypeProperty.value.type === 'FunctionTypeAnnotation' && objectTypeProperty.range[0] === objectTypeProperty.value.range[0];
};

var _default = function _default(context, report) {
  return function (objectTypeProperty) {
    if (isShortPropertyFunction(objectTypeProperty)) {
      // potential difference: not checked in before
      return;
    }

    report({
      colon: getColon(context, objectTypeProperty),
      name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(objectTypeProperty, context)),
      node: objectTypeProperty
    });
  };
};

exports["default"] = _default;
module.exports = exports.default;