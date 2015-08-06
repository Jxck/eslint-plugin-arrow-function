"use strict";

var rule = require("../../lib/rules/no-condition"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

var valid = [
    "if (a >= 1) {}",
    "while (a >= 1) {}",
    "for (var a = 1; a >= 10; a++) {}",
    "a >= 1 ? 2 : 3",
    "(a >= 1) ? 2 : 3",
    "[1,2,3].filter(n => n > 2)"
].map(function(code) {
    return {
        code: code,
        ecmaFeatures: { arrowFunctions: true }
    };
});

var message = "suspicious code: it seemd to be comparison `>=`, not arrow function `=>`";

var invalid = [
    "if (a => 1) {}",
    "if ((a) => 1) {}",
    "while (a => 1) {}",
    "for (var a = 1; a => 10; a++) {}",
    "a => 1 ? 2 : 3",
    "(a => 1) ? 2 : 3"
].map(function(code) {
    return {
        code: code,
        ecmaFeatures: { arrowFunctions: true },
        errors: [{ message: message }]
    };
});

ruleTester.run("./lib/rules/no-condition", rule, {
    valid: valid,
    invalid: invalid
});
