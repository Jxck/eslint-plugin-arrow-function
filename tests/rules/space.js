'use strict';
/*eslint no-multi-spaces:0, space-in-brackets:0 */

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

var TT = { before: true, after: true };
var TF = { before: true, after: false };
var FT = { before: false, after: true };
var FF = { before: false, after: false };

var MB = { message: 'Missing space before =>' };
var MA = { message: 'Missing space after =>' };
var UB = { message: 'Unexpected space before =>' };
var UA = { message: 'Unexpected space after =>' };

var valid = [
  [ TT, 'a => a'    ],
  [ TT, '() => {}'  ],
  [ TT, '(a) => {}' ],

  [ FT, 'a=> a'     ],
  [ FT, '()=> {}'   ],
  [ FT, '(a)=> {}'  ],

  [ TF, 'a =>a'     ],
  [ TF, '() =>{}'   ],
  [ TF, '(a) =>{}'  ],

  [ FF, 'a=>a'      ],
  [ FF, '()=>{}'    ],
  [ FF, '(a)=>{}'   ],

  [ {}, 'a => a'    ],
  [ {}, '() => {}'  ],
  [ {}, '(a) => {}' ]
].map(function(param) {
  return {
    args: [1, param[0]],
    code: param[1],
    ecmaFeatures: { arrowFunctions: true }
  };
});

var invalid = [
  [ TT, 'a=>a',        [MB, MA] ],
  [ TT, '()=>{}',      [MB, MA] ],
  [ TT, '(a)=>{}',     [MB, MA] ],

  [ TT, 'a  =>  a',    [UB, UA] ],
  [ TT, '()  =>  {}',  [UB, UA] ],
  [ TT, '(a)  =>  {}', [UB, UA] ],

  [ TF, 'a=> a',       [MB, UA] ],
  [ TF, '()=> {}',     [MB, UA] ],
  [ TF, '(a)=> {}',    [MB, UA] ],

  [ TF, 'a=>  a',      [MB, UA] ],
  [ TF, '()=>  {}',    [MB, UA] ],
  [ TF, '(a)=>  {}',   [MB, UA] ],

  [ FT, 'a =>a',       [UB, MA] ],
  [ FT, '() =>{}',     [UB, MA] ],
  [ FT, '(a) =>{}',    [UB, MA] ],

  [ FT, 'a  =>a',      [UB, MA] ],
  [ FT, '()  =>{}',    [UB, MA] ],
  [ FT, '(a)  =>{}',   [UB, MA] ],

  [ FF, 'a => a',      [UB, UA] ],
  [ FF, '() => {}',    [UB, UA] ],
  [ FF, '(a) => {}',   [UB, UA] ],

  [ FF, 'a  =>  a',    [UB, UA] ],
  [ FF, '()  =>  {}',  [UB, UA] ],
  [ FF, '(a)  =>  {}', [UB, UA] ]
].map(function(param) {
  return {
    ecmaFeatures: { arrowFunctions: true },
    args: [1, param[0]],
    code: param[1],
    errors: param[2]
  };
});

eslintTester.addRuleTest('./lib/rules/space', {
  valid: valid,
  invalid: invalid
});
