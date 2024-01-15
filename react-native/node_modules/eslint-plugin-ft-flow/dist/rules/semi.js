"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var schema = [{
  "enum": ['always', 'never'],
  type: 'string'
}];

var isSemicolon = function isSemicolon(token) {
  return token.type === 'Punctuator' && token.value === ';';
};

var create = function create(context) {
  var never = (context.options[0] || 'always') === 'never';
  var sourceCode = context.getSourceCode();

  var report = function report(node, missing) {
    var lastToken = sourceCode.getLastToken(node);
    var fix;
    var message;
    var loc = lastToken.loc;

    if (missing) {
      message = 'Missing semicolon.';
      loc = loc.end;

      fix = function fix(fixer) {
        return fixer.insertTextAfter(lastToken, ';');
      };
    } else {
      message = 'Extra semicolon.';
      loc = loc.start;

      fix = function fix(fixer) {
        return fixer.remove(lastToken);
      };
    }

    context.report({
      fix: fix,
      loc: loc,
      message: message,
      node: node
    });
  };

  var checkForSemicolon = function checkForSemicolon(node) {
    var lastToken = sourceCode.getLastToken(node);
    var isLastTokenSemicolon = isSemicolon(lastToken);

    if (never && isLastTokenSemicolon) {
      report(node, false);
    }

    if (!never && !isLastTokenSemicolon) {
      report(node, true);
    }
  };

  return {
    OpaqueType: checkForSemicolon,
    TypeAlias: checkForSemicolon,
    TypeAnnotation: function TypeAnnotation(node) {
      if (['PropertyDefinition', 'ClassProperty'].includes(node.parent.type)) {
        checkForSemicolon(node.parent);
      }
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