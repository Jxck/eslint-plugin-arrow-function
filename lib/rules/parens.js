'use strict';

module.exports = function(context) {
  var message = 'arrow function argument should wrap with parens';

  function parens(node) {
    var token = context.getFirstToken(node);
    if (token.type === 'Identifier') {
      var after = context.getTokenAfter(token);
      if (after.value !== ')') {
        context.report(node, message);
      }
    }
  }

  return {
    'ArrowFunctionExpression': parens
  };
};
