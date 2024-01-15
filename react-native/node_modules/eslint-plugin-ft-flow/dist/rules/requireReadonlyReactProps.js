"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var schema = [{
  additionalProperties: false,
  properties: {
    useImplicitExactTypes: {
      type: 'boolean'
    }
  },
  type: 'object'
}];
var reComponentName = /^(Pure)?Component$/;
var reReadOnly = /^\$(ReadOnly|FlowFixMe)$/;

var isReactComponent = function isReactComponent(node) {
  if (!node.superClass) {
    return false;
  }

  return (// class Foo extends Component { }
    // class Foo extends PureComponent { }
    node.superClass.type === 'Identifier' && reComponentName.test(node.superClass.name) // class Foo extends React.Component { }
    // class Foo extends React.PureComponent { }
    || node.superClass.type === 'MemberExpression' && node.superClass.object.name === 'React' && reComponentName.test(node.superClass.property.name)
  );
}; // type Props = {| +foo: string |}


var isReadOnlyObjectType = function isReadOnlyObjectType(node, _ref) {
  var useImplicitExactTypes = _ref.useImplicitExactTypes;

  if (!node || node.type !== 'ObjectTypeAnnotation') {
    return false;
  }

  if (node.properties.length === 0) {
    // we consider `{}` to be ReadOnly since it's exact
    // AND has no props (when `implicitExactTypes=true`)
    // we consider `{||}` to be ReadOnly since it's exact
    // AND has no props (when `implicitExactTypes=false`)
    if (useImplicitExactTypes === true && node.exact === false) {
      return true;
    }

    if (node.exact === true) {
      return true;
    }
  } // { +foo: ..., +bar: ..., ... }


  return node.properties.length > 0 && node.properties.every(function (prop) {
    return prop.variance && prop.variance.kind === 'plus';
  });
}; // type Props = {| +foo: string |} | {| +bar: number |}


var isReadOnlyObjectUnionType = function isReadOnlyObjectUnionType(node, options) {
  if (!node || node.type !== 'UnionTypeAnnotation') {
    return false;
  }

  return node.types.every(function (type) {
    return isReadOnlyObjectType(type, options);
  });
};

var isReadOnlyType = function isReadOnlyType(node, options) {
  return node.right.id && reReadOnly.test(node.right.id.name) || isReadOnlyObjectType(node.right, options) || isReadOnlyObjectUnionType(node.right, options);
};

var create = function create(context) {
  var useImplicitExactTypes = _lodash["default"].get(context, ['options', 0, 'useImplicitExactTypes'], false);

  var options = {
    useImplicitExactTypes: useImplicitExactTypes
  };
  var readOnlyTypes = [];
  var foundTypes = [];
  var reportedFunctionalComponents = [];

  var isReadOnlyClassProp = function isReadOnlyClassProp(node) {
    var id = node.superTypeParameters && node.superTypeParameters.params[0].id;
    return id && !reReadOnly.test(id.name) && !readOnlyTypes.includes(id.name) && foundTypes.includes(id.name);
  };

  var _iterator = _createForOfIteratorHelper(context.getSourceCode().ast.body),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var idName = void 0;
      var typeNode = void 0; // type Props = $ReadOnly<{}>

      if (node.type === 'TypeAlias') {
        idName = node.id.name;
        typeNode = node; // export type Props = $ReadOnly<{}>
      } else if (node.type === 'ExportNamedDeclaration' && node.declaration && node.declaration.type === 'TypeAlias') {
        idName = node.declaration.id.name;
        typeNode = node.declaration;
      }

      if (idName) {
        foundTypes.push(idName);

        if (isReadOnlyType(typeNode, options)) {
          readOnlyTypes.push(idName);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return {
    // class components
    ClassDeclaration: function ClassDeclaration(node) {
      if (isReactComponent(node) && isReadOnlyClassProp(node)) {
        context.report({
          message: "".concat(node.superTypeParameters.params[0].id.name, " must be $ReadOnly"),
          node: node
        });
      } else if (node.superTypeParameters && node.superTypeParameters.params[0].type === 'ObjectTypeAnnotation' && !isReadOnlyObjectType(node.superTypeParameters.params[0], options)) {
        context.report({
          message: "".concat(node.id.name, " class props must be $ReadOnly"),
          node: node
        });
      }
    },
    // functional components
    JSXElement: function JSXElement(node) {
      var currentNode = node;

      while (currentNode && currentNode.type !== 'FunctionDeclaration') {
        currentNode = currentNode.parent;
      } // functional components can only have 1 param


      if (!currentNode || currentNode.params.length !== 1) {
        return;
      }

      var typeAnnotation = currentNode.params[0].typeAnnotation;

      if (currentNode.params[0].type === 'Identifier' && typeAnnotation) {
        var identifier = typeAnnotation.typeAnnotation.id;

        if (identifier && foundTypes.includes(identifier.name) && !readOnlyTypes.includes(identifier.name) && !reReadOnly.test(identifier.name)) {
          if (reportedFunctionalComponents.includes(identifier)) {
            return;
          }

          context.report({
            message: "".concat(identifier.name, " must be $ReadOnly"),
            node: identifier
          });
          reportedFunctionalComponents.push(identifier);
          return;
        }

        if (typeAnnotation.typeAnnotation.type === 'ObjectTypeAnnotation' && !isReadOnlyObjectType(typeAnnotation.typeAnnotation, options)) {
          context.report({
            message: "".concat(currentNode.id.name, " component props must be $ReadOnly"),
            node: node
          });
        }
      }
    }
  };
};

var _default = {
  create: create,
  schema: schema
};
exports["default"] = _default;
module.exports = exports.default;