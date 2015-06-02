'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

function process(list, args, error) {
  return list.map(function(code) {
    var result = {
      code: code,
      ecmaFeatures: { arrowFunctions: true },
      args: args
    };
    if (error) {
      result.errors = [{
        message: error
      }];
    }
    return result;
  });
}

var alwaysValid = [
  '() => { var x = 2 + 2; return x; }',
  '(bar) => ({foo: bar})',
  '() => 5',
  '() => multiline(\narg1, arg2\n)'
];

var alwaysInvalid = [
  '(bar) => { return { foo: bar }}',
  '() => { return 5; }',
  '() => { return multiline(\narg1, arg2\n); }'
];

var objectValid = [
  '() => { var x = 2 + 2; return x; }',
  '(bar) => ({foo: bar})',
  '() => 5',
  '() => { return 5; }',
  '() => multiline(\narg1, arg2\n)',
  '() => { return multiline(\narg1, arg2\n); }'
];

var objectInvalid = [
  '(bar) => { return { foo: bar }}'
];

var neverValid = [
  '() => { var x = 2 + 2; return x; }',
  '(bar) => { return { foo: bar }}',
  '() => { return multiline(\narg1, arg2\n); }'
];

var neverInvalid = [
  '(bar) => ({foo: bar})',
  '() => 5',
  '() => multiline(\narg1, arg2\n)'
];

eslintTester.addRuleTest('./lib/rules/return-shorthand', {
  valid: process(alwaysValid, [ 2, 'always' ])
    .concat(process(objectValid, [ 2, 'only-object' ]))
    .concat(process(neverValid, [ 2, 'never' ])),
  invalid: process(
    alwaysInvalid,
    [ 2, 'always' ],
    'arrow functions should use shorthand to return'
  ).concat(process(
    objectInvalid,
    [ 2, 'only-object' ],
    'arrow functions should use shorthand to return objects'
  )).concat(process(
    neverInvalid,
    [ 2, 'never' ],
    'arrow functions should always use block'
  ))
});
