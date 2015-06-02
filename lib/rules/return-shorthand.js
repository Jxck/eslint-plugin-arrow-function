'use strict';

module.exports = function(context) {
  var option = context.options[0];
  var enforce;
  var onlyObject = false;
  if (option === 'always') {
    enforce = true;
  } else if (option === 'only-object') {
    enforce = true;
    onlyObject = true;
  } else if (option === 'never') {
    enforce = false;
  } else {
    enforce = true;
    onlyObject = true;
  }


  var ALWAYS_MESSAGE = 'arrow functions should use shorthand to return';
  var OBJECT_MESSAGE = 'arrow functions should use shorthand to return objects';
  var NEVER_MESSAGE = 'arrow functions should always use block';

  function checkForShorthand(node) {
    var body = node.body;
    if (body.type === 'BlockStatement') {
      if (enforce) {
        if (body.body.length > 0 && body.body[0].type === 'ReturnStatement') {
          var returnStatement = body.body[0];
          if (onlyObject &&
              returnStatement.argument !== null &&
              returnStatement.argument.type === 'ObjectExpression') {
            context.report(node, OBJECT_MESSAGE);
          } else if (!onlyObject) {
            context.report(node, ALWAYS_MESSAGE);
          }
        }
      }
    } else if (!enforce) {
      context.report(node, NEVER_MESSAGE);
    }
  }

  return {
    'ArrowFunctionExpression': checkForShorthand
  };
};

module.exports.schema = [
  {
    'enum': [ 'always', 'only-object', 'never' ]
  }
];
