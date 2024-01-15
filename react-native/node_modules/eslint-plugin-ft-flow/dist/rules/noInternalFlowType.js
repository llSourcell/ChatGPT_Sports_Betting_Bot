"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, void 0, groups); }; var _super = RegExp.prototype, _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype); } function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { return groups[name] = result[g[name]], groups; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); return result && (result.groups = buildGroups(result, this)), result; }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if ("string" == typeof substitution) { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } if ("function" == typeof substitution) { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; return "object" != _typeof(args[args.length - 1]) && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args); }); } return _super[Symbol.replace].call(this, str, substitution); }, _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// We enumerate here all the React components Flow patches internally. It's because we don't want
// to fail on otherwise valid type names (but rather take the actual implementation into account).
// See: https://github.com/facebook/flow/blob/e23278bc17e6a0b5a2c52719d24b6bc5bb716931/src/services/code_action/insert_type_utils.ml#L607-L610
var ReactComponents = ['AbstractComponent', 'ChildrenArray', 'ComponentType', 'Config', 'Context', 'Element', 'ElementConfig', 'ElementProps', 'ElementRef', 'ElementType', 'Key', 'Node', 'Portal', 'Ref', 'StatelessFunctionalComponent'];

var create = function create(context) {
  return {
    Identifier: function Identifier(node) {
      var match = node.name.match( /*#__PURE__*/_wrapRegExp(/^React\$((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)/, {
        internalTypeName: 1
      }));

      if (match !== null && match.groups !== null && match.groups !== undefined) {
        var internalTypeName = match.groups.internalTypeName;

        if (ReactComponents.includes(internalTypeName)) {
          var validName = "React.".concat(internalTypeName);
          context.report({
            data: {
              invalidName: node.name,
              validName: validName
            },
            message: 'Type identifier \'{{invalidName}}\' is not allowed. Use \'{{validName}}\' instead.',
            node: node
          });
        }
      }
    }
  };
};

var _default = {
  create: create
};
exports["default"] = _default;
module.exports = exports.default;