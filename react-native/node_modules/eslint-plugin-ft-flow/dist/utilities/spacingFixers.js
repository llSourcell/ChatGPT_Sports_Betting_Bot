"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripSpacesBefore = exports.stripSpacesAfter = exports.stripSpaces = exports.replaceWithSpaceBefore = exports.replaceWithSpaceAfter = exports.replaceWithSpace = exports.addSpaceBefore = exports.addSpaceAfter = exports.addSpace = void 0;

var stripSpacesBefore = function stripSpacesBefore(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.range[0] - spaces, node.range[0]]);
  };
};

exports.stripSpacesBefore = stripSpacesBefore;

var stripSpacesAfter = function stripSpacesAfter(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.range[1], node.range[1] + spaces]);
  };
};

exports.stripSpacesAfter = stripSpacesAfter;

var addSpaceBefore = function addSpaceBefore(node) {
  return function (fixer) {
    return fixer.insertTextBefore(node, ' ');
  };
};

exports.addSpaceBefore = addSpaceBefore;

var addSpaceAfter = function addSpaceAfter(node) {
  return function (fixer) {
    return fixer.insertTextAfter(node, ' ');
  };
};

exports.addSpaceAfter = addSpaceAfter;

var replaceWithSpaceBefore = function replaceWithSpaceBefore(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.range[0] - spaces, node.range[0]], ' ');
  };
};

exports.replaceWithSpaceBefore = replaceWithSpaceBefore;

var replaceWithSpaceAfter = function replaceWithSpaceAfter(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.range[1], node.range[1] + spaces], ' ');
  };
};

exports.replaceWithSpaceAfter = replaceWithSpaceAfter;

var stripSpaces = function stripSpaces(direction, node, spaces) {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  }

  return stripSpacesAfter(node, spaces);
};

exports.stripSpaces = stripSpaces;

var addSpace = function addSpace(direction, node) {
  if (direction === 'before') {
    return addSpaceBefore(node);
  }

  return addSpaceAfter(node);
};

exports.addSpace = addSpace;

var replaceWithSpace = function replaceWithSpace(direction, node, spaces) {
  if (direction === 'before') {
    return replaceWithSpaceBefore(node, spaces);
  }

  return replaceWithSpaceAfter(node, spaces);
};

exports.replaceWithSpace = replaceWithSpace;