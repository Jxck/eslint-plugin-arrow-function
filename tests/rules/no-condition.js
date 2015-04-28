'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);


var valid = [
  'if (a >= 1) {}',
  'while (a >= 1) {}',
  'for (var a = 1; a >= 10; a++) {}',
  'a >= 1 ? 2 : 3',
  '(a >= 1) ? 2 : 3',
  '[1,2,3].filter(n => n > 2)'
].map(function(code) {
  return {
    code: code,
    ecmaFeatures: { arrowFunctions: true }
  };
});

var message = 'suspicious code: it seemd to be comparison ">=", not arrow function "=>"';

var invalid = [
  'if (a => 1) {}',
  'if ((a) => 1) {}',
  'while (a => 1) {}',
  'for (var a = 1; a => 10; a++) {}',
  'a => 1 ? 2 : 3',
  '(a => 1) ? 2 : 3'
].map(function(code) {
  return {
    code: code,
    ecmaFeatures: { arrowFunctions: true },
    errors: [{ message: message }]
  };
});

eslintTester.addRuleTest('./lib/rules/no-condition', {
  valid: valid,
  invalid: invalid
});
