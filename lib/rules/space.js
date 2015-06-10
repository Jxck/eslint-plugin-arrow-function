'use strict';

module.exports = function(context) {
  function mergeRule(options) {
    // default
    var rule = { before: true, after: true };

    // merge args
    if (options.length > 0) {
      var option = options[0];

      if (option.before !== undefined) {
        rule.before = option.before;
      }

      if (option.after !== undefined) {
        rule.after = option.after;
      }
    }

    return rule;
  }

  function getTokens(node) {
    var t = context.getFirstToken(node);
    var before;
    while (t.value !== '=>') {
      before = t;
      t = context.getTokenAfter(t);
    }
    var after = context.getTokenAfter(t);
    return { before: before, arrow: t, after: after };
  }

  function checkSpace(tokens) {
    var before = tokens.arrow.range[0] - tokens.before.range[1];
    var after = tokens.after.range[0] - tokens.arrow.range[1];
    return { before: before, after: after };
  }

  function space(node) {
    var rule = mergeRule(context.options);
    var tokens = getTokens(node);
    var spaces = checkSpace(tokens);

    if (rule.before === true) {
      // should one space
      if (spaces.before > 1) {
        context.report(tokens.before, 'Unexpected space before =>');
      }
      if (spaces.before === 0) {
        context.report(tokens.before, 'Missing space before =>');
      }
    }

    if (rule.before === false) {
      // should no space
      if (spaces.before > 0) {
        context.report(tokens.before, 'Unexpected space before =>');
      }
    }

    if (rule.after === true) {
      // should one space
      if (spaces.after > 1) {
        context.report(tokens.after, 'Unexpected space after =>');
      }
      if (spaces.after === 0) {
        context.report(tokens.after, 'Missing space after =>');
      }
    }

    if (rule.after === false) {
      // should no space
      if (spaces.after > 0) {
        context.report(tokens.after, 'Unexpected space after =>');
      }
    }
  }

  return {
    'ArrowFunctionExpression': space
  };
};
