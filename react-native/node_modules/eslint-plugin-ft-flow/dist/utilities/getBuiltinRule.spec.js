"use strict";

var _getBuiltinRule = require("./getBuiltinRule");

describe('getBuiltinRule', function () {
  it('works with jest', function () {
    (0, _getBuiltinRule.getBuiltinRule)('no-undef');
  });
});