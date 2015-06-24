'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);


var valid = [
  '() => {}',
  '(a) => {}',
  '(a) => a',
  '(a) => {\n}',
  'a.then((foo) => {});',
  'a.then((foo) => { if (true) {}; });'
].map(function(code) {
  return {
    code: code,
    ecmaFeatures: { arrowFunctions: true }
  };
});

var message = 'arrow function argument should wrap with parens';

var invalid = [
  'a => {}',
  'a => a',
  'a => {\n}',
  'a.then(foo => {});',
  'a.then(foo => a);',
  'a(foo => { if (true) {}; });'
].map(function(code) {
  return {
    code: code,
    ecmaFeatures: { arrowFunctions: true },
    errors: [{ message: message }]
  };
});

eslintTester.addRuleTest('./lib/rules/parens', {
  valid: valid,
  invalid: invalid
});
