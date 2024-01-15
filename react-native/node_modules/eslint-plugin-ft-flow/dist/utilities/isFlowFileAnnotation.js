"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FLOW_MATCHER = /^@(?:no)?flow$/;

var _default = function _default(comment, strict) {
  return (// The flow parser splits comments with the following regex to look for the  flag.
    // See https://github.com/facebook/flow/blob/a96249b93541f2f7bfebd8d62085bf7a75de02f2/src/parsing/docblock.ml#L39
    _lodash["default"].some(comment.split(/[\t\n\r \*\/\\]+/), function (commentPart) {
      var match = commentPart.match(FLOW_MATCHER);

      if (match === null) {
        return false;
      }

      return !strict || match[0] === '@flow';
    })
  );
};

exports["default"] = _default;
module.exports = exports.default;