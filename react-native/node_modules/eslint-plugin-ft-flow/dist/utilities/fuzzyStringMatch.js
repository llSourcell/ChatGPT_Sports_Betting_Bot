"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Creates an array of letter pairs from a given array
// origin: https://github.com/d3/d3-array/blob/master/src/pairs.js
var arrayPairs = function arrayPairs(array) {
  var ii = 0;
  var length = array.length - 1;
  var letter = array[0];
  var pairs = Array.from({
    length: length < 0 ? 0 : length
  });

  while (ii < length) {
    // Not entirely sure what ++ii does yet
    // eslint-disable-next-line no-plusplus
    pairs[ii] = [letter, letter = array[++ii]];
  }

  return pairs;
}; // Based on http://stackoverflow.com/a/23305385


var stringSimilarity = function stringSimilarity(str1, str2) {
  if (str1.length > 0 && str2.length > 0) {
    var pairs1 = arrayPairs(str1);
    var pairs2 = arrayPairs(str2);
    var unionLen = pairs1.length + pairs2.length;
    var hitCount;
    hitCount = 0;

    _lodash["default"].forIn(pairs1, function (val1) {
      _lodash["default"].forIn(pairs2, function (val2) {
        if (_lodash["default"].isEqual(val1, val2)) {
          hitCount += 1;
        }
      });
    });

    if (hitCount > 0) {
      return 2 * hitCount / unionLen;
    }
  }

  return 0;
};

var _default = function _default(needle, haystack) {
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  return stringSimilarity(needle, haystack) >= Number(weight);
};

exports["default"] = _default;
module.exports = exports.default;