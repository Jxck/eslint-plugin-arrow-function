module.exports = function (context) {
    'use strict';
    function paren(node) {
      var token = context.getFirstToken(node);
      if (token.type === 'Identifier') {
        var after = context.getTokenAfter(token);
        if (after.value !== ')') {
          context.report(node, 'arrow function argument should wrap with parens');
        }
      }
    }
    return {
        "ArrowFunctionExpression": paren
    };
};
