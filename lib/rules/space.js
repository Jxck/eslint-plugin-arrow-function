'use strict';

module.exports = function(context) {
  var message = '`=>` in arrow fuction should wrap with space';

  function space(node) {
    var src = context.getSource(node);
    var fn = src.split('\n')[0];

    var matched = fn.match(/ => /);
    if (matched === null) {
      context.report(node, message);
    }
  }

  return {
    'ArrowFunctionExpression': space
  };
};
