"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _stringNaturalCompare = _interopRequireDefault(require("string-natural-compare"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  "enum": ['asc', 'desc'],
  type: 'string'
}, {
  additionalProperties: false,
  type: 'object'
}];
/**
 * @private
 */

var sorters = {
  asc: function asc(a, b) {
    return (0, _stringNaturalCompare["default"])(a, b, {
      caseInsensitive: true
    });
  },
  desc: function desc(a, b) {
    return (0, _stringNaturalCompare["default"])(b, a, {
      caseInsensitive: true
    });
  }
};

var generateOrderedList = function generateOrderedList(context, sort, properties) {
  var source = context.getSourceCode();
  var items = properties.map(function (property) {
    var name = (0, _utilities.getParameterName)(property, context);
    var commentsBefore = source.getCommentsBefore(property);
    var startIndex = commentsBefore.length > 0 ? commentsBefore[0].range[0] : property.range[0];
    var isMethodProperty = property.value && property.value.type === 'FunctionTypeAnnotation';

    if (property.type === 'ObjectTypeSpreadProperty' || !property.value || isMethodProperty) {
      // NOTE: It could but currently does not fix recursive generic type
      // arguments in GenericTypeAnnotation within ObjectTypeSpreadProperty.
      // Maintain everything between the start of property including leading
      // comments and the nextPunctuator `,` or `}`:
      var nextPunctuator = source.getTokenAfter(property, {
        filter: function filter(token) {
          return token.type === 'Punctuator' || token.value === '|}';
        }
      });
      var beforePunctuator = source.getTokenBefore(nextPunctuator, {
        includeComments: true
      });
      var text = source.getText().slice(startIndex, beforePunctuator.range[1]);
      return [property, name, text];
    }

    var colonToken = source.getTokenBefore(property.value, {
      filter: function filter(token) {
        return token.value === ':';
      }
    }); // Preserve all code until the colon verbatim:

    var key = source.getText().slice(startIndex, colonToken.range[0]);
    var value;

    if (property.value.type === 'ObjectTypeAnnotation') {
      // eslint-disable-next-line no-use-before-define
      value = " ".concat(generateFix(property.value, context, sort));
    } else {
      // NOTE: It could but currently does not fix recursive generic
      // type arguments in GenericTypeAnnotation.
      // Maintain everything between the `:` and the next Punctuator `,` or `}`:
      var _nextPunctuator = source.getTokenAfter(property, {
        filter: function filter(token) {
          return token.type === 'Punctuator' || token.value === '|}';
        }
      });

      var _beforePunctuator = source.getTokenBefore(_nextPunctuator, {
        includeComments: true
      });

      var _text = source.getText().slice(colonToken.range[1], _beforePunctuator.range[1]);

      value = _text;
    }

    return [property, name, key, value];
  });
  var itemGroups = [[]];
  var itemGroupIndex = 0;

  var _iterator = _createForOfIteratorHelper(items),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (item[0].type === 'ObjectTypeSpreadProperty') {
        itemGroupIndex += 1;
        itemGroups[itemGroupIndex] = [item];
        itemGroupIndex += 1;
        itemGroups[itemGroupIndex] = [];
      } else {
        itemGroups[itemGroupIndex].push(item);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var orderedList = [];

  for (var _i = 0, _itemGroups = itemGroups; _i < _itemGroups.length; _i++) {
    var itemGroup = _itemGroups[_i];

    if (itemGroup[0] && itemGroup[0].type !== 'ObjectTypeSpreadProperty') {
      // console.log('itemGroup', itemGroup);
      itemGroup.sort(function (first, second) {
        return sort(first[1], second[1]);
      });
    }

    orderedList.push.apply(orderedList, _toConsumableArray(itemGroup.map(function (item) {
      if (item.length === 3) {
        return item[2];
      }

      return "".concat(item[2], ":").concat(item[3]);
    })));
  }

  return orderedList;
};

var generateFix = function generateFix(node, context, sort) {
  // this could be done much more cleanly in ESLint >=4
  // as we can apply multiple fixes. That also means we can
  // maintain code style in a much nicer way
  var nodeText;
  var newTypes = generateOrderedList(context, sort, node.properties);
  var source = context.getSourceCode(node);
  var originalSubstring = source.getText(node);
  nodeText = originalSubstring;

  var _iterator2 = _createForOfIteratorHelper(node.properties.entries()),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          index = _step2$value[0],
          property = _step2$value[1];

      var nextPunctuator = source.getTokenAfter(property, {
        filter: function filter(token) {
          return token.type === 'Punctuator' || token.value === '|}';
        }
      });
      var beforePunctuator = source.getTokenBefore(nextPunctuator, {
        includeComments: true
      });
      var commentsBefore = source.getCommentsBefore(property);
      var startIndex = commentsBefore.length > 0 ? commentsBefore[0].range[0] : property.range[0];
      var subString = source.getText().slice(startIndex, beforePunctuator.range[1]);
      nodeText = nodeText.replace(subString, "$".concat(index));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(newTypes.entries()),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = _slicedToArray(_step3.value, 2),
          _index = _step3$value[0],
          item = _step3$value[1];

      nodeText = nodeText.replace("$".concat(_index), item);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return nodeText;
};

var create = function create(context) {
  var order = _lodash["default"].get(context, ['options', 0], 'asc');

  var prev;

  var checkKeyOrder = function checkKeyOrder(node) {
    prev = null;
    node.properties.forEach(function (identifierNode) {
      var current = (0, _utilities.getParameterName)(identifierNode, context);
      var last = prev; // keep track of the last token

      prev = current || last;

      if (!last || !current) {
        return;
      }

      var sort = sorters[order];

      if (sort(last, current) > 0) {
        context.report({
          data: {
            current: current,
            last: last,
            order: order
          },
          fix: function fix(fixer) {
            var nodeText = generateFix(node, context, sort);
            return fixer.replaceText(node, nodeText);
          },
          loc: identifierNode.loc,
          message: 'Expected type annotations to be in {{order}}ending order. "{{current}}" must be before "{{last}}".',
          node: identifierNode
        });
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkKeyOrder
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