'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);


var valid = [
  '() => {}',
  '(a) => {}',
  'a => a',
  '() => {\n}'
].map(function(code) {
  return {
    code: code,
    args: [ 1, { before: true, after: true }],
    ecmaFeatures: { arrowFunctions: true }
  };
});

var message = '`=>` in arrow fuction should wrap with space';

var invalid = [
  '()=> {}',
  '() =>{}',
  '(a)=> {}',
  '(a) =>{}',
  'a =>a',
  'a=> a',
  '()=> {\n}',
  '() =>{\n}'
].map(function(code) {
  return {
    code: code,
    ecmaFeatures: { arrowFunctions: true },
    errors: [{ message: message }]
  };
});

eslintTester.addRuleTest('./lib/rules/space', {
  valid: valid,
  invalid: invalid
});
