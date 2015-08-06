"use strict";

module.exports = function(context) {
    var message = "suspicious code: it seemd to be comparison `>=`, not arrow function `=>`";

    function testProp(node) {
        if (node.test.type === "ArrowFunctionExpression") {
            context.report(node, message);
        }
    }

    // for "a => 1 ? 2 : 3"
    function arrowFunc(node) {
        if (node.body.type === "ConditionalExpression") {
            context.report(node, message);
        }
    }

    return {
        "IfStatement": testProp,
        "WhileStatement": testProp,
        "ForStatement": testProp,
        "ConditionalExpression": testProp,
        "ArrowFunctionExpression": arrowFunc
    };
};
