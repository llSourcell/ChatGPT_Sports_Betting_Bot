"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utilities = require("../utilities");

var schema = [{
  type: 'string'
}];

var message = function message() {
  var suppression = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(suppression, " is missing a suppression error code. Please update this suppression to use an error code: ").concat(suppression, "[\u2026]");
};

var create = function create(context) {
  var isMissingSuppressionCode = function isMissingSuppressionCode(value) {
    var failedType;

    _utilities.suppressionTypes.forEach(function (cur) {
      if (value && value.startsWith(cur) && !value.startsWith("".concat(cur, "[")) && !value.endsWith(']')) {
        failedType = cur;
      }
    });

    return failedType;
  };

  var handleComment = function handleComment(comment) {
    var value = comment.type === 'Block' ? comment.value.replace(/\*/g, '') : comment.value;
    var suppression = value.trim().split(' ').filter(function (arg) {
      return arg.length > 0;
    })[0];
    var failedType = isMissingSuppressionCode(suppression);

    if (failedType) {
      context.report(comment, message(failedType));
    }
  };

  return {
    Program: function Program() {
      context.getSourceCode().getAllComments().filter(function (comment) {
        return comment.type === 'Block' || comment.type === 'Line';
      }).forEach(handleComment);
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;