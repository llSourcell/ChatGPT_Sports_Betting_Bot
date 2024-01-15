"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var schema = [{
  "enum": ['always', 'always-multiline', 'only-multiline', 'never'],
  type: 'string'
}, {
  "enum": ['always', 'always-multiline', 'only-multiline', 'never'],
  type: 'string'
}, {
  "enum": ['always', 'always-multiline', 'only-multiline', 'never'],
  type: 'string'
}]; // required for reporting the correct position

var getLast = function getLast(property, indexer) {
  if (!property) {
    return indexer;
  }

  if (!indexer) {
    return property;
  }

  if (property.loc.end.line > indexer.loc.end.line) {
    return property;
  }

  if (indexer.loc.end.line > property.loc.end.line) {
    return indexer;
  }

  if (property.loc.end.column > indexer.loc.end.column) {
    return property;
  }

  return indexer;
};

var create = function create(context) {
  var option = context.options[0] || 'never';
  var interfaceOption = context.options[1] || option;
  var inexactNotationOption = context.options[2] || 'never';
  var sourceCode = context.getSourceCode();

  var getNodeOption = function getNodeOption(node) {
    if (node.parent.type === 'InterfaceDeclaration') {
      return interfaceOption;
    }

    if (node.inexact) {
      return inexactNotationOption;
    }

    return option;
  };

  var reporter = function reporter(node, message, fix) {
    return function () {
      context.report({
        fix: fix,
        message: message,
        node: node
      });
    };
  };

  var makeReporters = function makeReporters(node, tokenToFix) {
    return {
      dangle: reporter(node, 'Unexpected trailing delimiter', function (fixer) {
        return fixer.replaceText(tokenToFix, '');
      }),
      noDangle: reporter(node, 'Missing trailing delimiter', function (fixer) {
        return fixer.insertTextAfter(tokenToFix, ',');
      })
    };
  };

  var evaluate = function evaluate(node, lastChildNode) {
    if (!lastChildNode && !node.inexact) {
      return;
    }

    var _sourceCode$getLastTo = sourceCode.getLastTokens(node, 2),
        _sourceCode$getLastTo2 = _slicedToArray(_sourceCode$getLastTo, 2),
        penultimateToken = _sourceCode$getLastTo2[0],
        lastToken = _sourceCode$getLastTo2[1];

    var isDangling = [';', ','].includes(penultimateToken.value);
    var isMultiLine = penultimateToken.loc.start.line !== lastToken.loc.start.line; // Use the object node if it's inexact since there's no child node for the inexact notation

    var report = makeReporters(node.inexact ? node : lastChildNode, penultimateToken);
    var nodeOption = getNodeOption(node);

    if (nodeOption === 'always' && !isDangling) {
      report.noDangle();
      return;
    }

    if (nodeOption === 'never' && isDangling) {
      report.dangle();
      return;
    }

    if (nodeOption === 'always-multiline' && !isDangling && isMultiLine) {
      report.noDangle();
      return;
    }

    if (nodeOption === 'always-multiline' && isDangling && !isMultiLine) {
      report.dangle();
      return;
    }

    if (nodeOption === 'only-multiline' && isDangling && !isMultiLine) {
      report.dangle();
    }
  };

  return {
    ObjectTypeAnnotation: function ObjectTypeAnnotation(node) {
      evaluate(node, getLast(_lodash["default"].last(node.properties), _lodash["default"].last(node.indexers)));
    },
    TupleTypeAnnotation: function TupleTypeAnnotation(node) {
      evaluate(node, _lodash["default"].last(node.types));
    }
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