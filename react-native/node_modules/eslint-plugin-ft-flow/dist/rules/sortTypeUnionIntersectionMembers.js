"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var groups = {
  "function": 'function',
  intersection: 'intersection',
  keyword: 'keyword',
  literal: 'literal',
  named: 'named',
  nullish: 'nullish',
  object: 'object',
  tuple: 'tuple',
  union: 'union',
  unknown: 'unknown'
}; // eslint-disable-next-line complexity

var getGroup = function getGroup(node) {
  // eslint-disable-next-line default-case
  switch (node.type) {
    case 'FunctionTypeAnnotation':
      return groups["function"];

    case 'IntersectionTypeAnnotation':
      return groups.intersection;

    case 'AnyTypeAnnotation':
    case 'BooleanTypeAnnotation':
    case 'NumberTypeAnnotation':
    case 'StringTypeAnnotation':
    case 'SymbolTypeAnnotation':
    case 'ThisTypeAnnotation':
      return groups.keyword;

    case 'NullLiteralTypeAnnotation':
    case 'NullableTypeAnnotation':
    case 'VoidTypeAnnotation':
      return groups.nullish;

    case 'BooleanLiteralTypeAnnotation':
    case 'NumberLiteralTypeAnnotation':
    case 'StringLiteralTypeAnnotation':
      return groups.literal;

    case 'ArrayTypeAnnotation':
    case 'IndexedAccessType':
    case 'GenericTypeAnnotation':
    case 'OptionalIndexedAccessType':
      return groups.named;

    case 'ObjectTypeAnnotation':
      return groups.object;

    case 'TupleTypeAnnotation':
      return groups.tuple;

    case 'UnionTypeAnnotation':
      return groups.union;
  }

  return groups.unknown;
};

var fallbackSort = function fallbackSort(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

var sorters = {
  asc: function asc(collator, a, b) {
    return collator.compare(a, b) || fallbackSort(a, b);
  },
  desc: function desc(collator, a, b) {
    return collator.compare(b, a) || fallbackSort(b, a);
  }
};

var create = function create(context) {
  var sourceCode = context.getSourceCode();

  var _ref = context.options[1] || {},
      _ref$checkIntersectio = _ref.checkIntersections,
      checkIntersections = _ref$checkIntersectio === void 0 ? true : _ref$checkIntersectio,
      _ref$checkUnions = _ref.checkUnions,
      checkUnions = _ref$checkUnions === void 0 ? true : _ref$checkUnions,
      _ref$groupOrder = _ref.groupOrder,
      groupOrder = _ref$groupOrder === void 0 ? [groups.keyword, groups.named, groups.literal, groups["function"], groups.object, groups.tuple, groups.intersection, groups.union, groups.nullish] : _ref$groupOrder,
      _ref$order = _ref.order,
      order = _ref$order === void 0 ? 'asc' : _ref$order;

  var sort = sorters[order];
  var collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base'
  });

  var checkSorting = function checkSorting(node) {
    var sourceOrder = node.types.map(function (type) {
      var _groupOrder$indexOf;

      var group = (_groupOrder$indexOf = groupOrder === null || groupOrder === void 0 ? void 0 : groupOrder.indexOf(getGroup(type))) !== null && _groupOrder$indexOf !== void 0 ? _groupOrder$indexOf : -1;
      return {
        group: group === -1 ? Number.MAX_SAFE_INTEGER : group,
        node: type,
        text: sourceCode.getText(type)
      };
    });

    var expectedOrder = _toConsumableArray(sourceOrder).sort(function (a, b) {
      if (a.group !== b.group) {
        return a.group - b.group;
      }

      return sort(collator, a.text, b.text);
    });

    var hasComments = node.types.some(function (type) {
      var count = sourceCode.getCommentsBefore(type).length + sourceCode.getCommentsAfter(type).length;
      return count > 0;
    });
    var prev = null;

    for (var i = 0; i < expectedOrder.length; i += 1) {
      var type = node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection';
      var current = sourceOrder[i].text;
      var last = prev; // keep track of the last token

      prev = current || last;

      if (!last || !current) {
        continue;
      }

      if (expectedOrder[i].node !== sourceOrder[i].node) {
        var data = {
          current: current,
          last: last,
          order: order,
          type: type
        };

        var fix = function fix(fixer) {
          var sorted = expectedOrder.map(function (t) {
            return t.text;
          }).join(node.type === 'UnionTypeAnnotation' ? ' | ' : ' & ');
          return fixer.replaceText(node, sorted);
        };

        context.report(_objectSpread({
          data: data,
          messageId: 'notSorted',
          node: node
        }, hasComments ? {
          suggest: [{
            fix: fix,
            messageId: 'suggestFix'
          }]
        } : {
          fix: fix
        }));
      }
    }
  };

  return {
    IntersectionTypeAnnotation: function IntersectionTypeAnnotation(node) {
      if (checkIntersections === true) {
        checkSorting(node);
      }
    },
    UnionTypeAnnotation: function UnionTypeAnnotation(node) {
      if (checkUnions === true) {
        checkSorting(node);
      }
    }
  };
};

var _default = {
  create: create,
  meta: {
    fixable: 'code',
    messages: {
      notSorted: 'Expected {{type}} members to be in {{order}}ending order. "{{current}}" should be before "{{last}}".',
      suggestFix: 'Sort members of type (removes all comments).'
    },
    schema: [{
      properties: {
        checkIntersections: {
          type: 'boolean'
        },
        checkUnions: {
          type: 'boolean'
        },
        groupOrder: {
          items: {
            "enum": Object.keys(groups),
            type: 'string'
          },
          type: 'array'
        },
        order: {
          "enum": ['asc', 'desc'],
          type: 'string'
        }
      },
      type: 'object'
    }]
  }
};
exports["default"] = _default;
module.exports = exports.default;