'use strict';

var msg = 'suspicious code: it seemd to be comparison ">=", not arrow function "=>"';

module.exports = function (context) {
  function testProp(node) {
    if (node.test.type === 'ArrowFunctionExpression') {
      context.report(node, msg);
    }
  }

  // for "a => 1 ? 2 : 3"
  function arrowFunc(node) {
    if (node.body.type === 'ConditionalExpression') {
      context.report(node, msg);
    }
  }

  return {
    'IfStatement': testProp,
    'WhileStatement': testProp,
    'ForStatement': testProp,
    'ConditionalExpression': testProp,
    'ArrowFunctionExpression': arrowFunc
  };
};
