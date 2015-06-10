'use strict';

module.exports = function(context) {
  var message = '`=>` in arrow fuction should wrap with space';

  function space(node) {
    // default
    var rule = { before: true, after: true };

    // merge args
    if (context.options.length > 0) {
      var option = context.options[0];

      if (option.before !== undefined) {
        rule.before = option.before;
      }

      if (option.after !== undefined) {
        rule.after = option.after;
      }
    }

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
