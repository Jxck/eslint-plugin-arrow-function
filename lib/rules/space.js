module.exports = function (context) {
    'use strict';
    function space(node) {
      var src = context.getSource(node);
      var fn = src.split('\n')[0];

      var matched = fn.match(/ => /);
      if (matched === null) {
        context.report(node, '`=>` in arrow fuction should wrap with space');
      }
    }
    return {
        "ArrowFunctionExpression": space
    };
};
