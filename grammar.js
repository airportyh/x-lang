// Generated automatically by nearley, version 2.19.2
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: "program",
                body: data[0]
            };
        }
                },
    {"name": "statements", "symbols": [], "postprocess": 
        () =>[]
                },
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => [data[1]]
                },
    {"name": "statements$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_", "statement", "_", "statements$ebnf$1", "statements"], "postprocess": 
        (data) => [data[1], ...data[4]]
                },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "statement", "symbols": ["function_definition"], "postprocess": id},
    {"name": "assignment", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "function_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expression_list", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters: data[4]
            }
        }
            },
    {"name": "function_definition", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expression_list", "_", {"literal":")"}, "_", "code_block"], "postprocess": 
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameters: data[4],
                body: data[8]
            }
        }
            },
    {"name": "code_block", "symbols": [{"literal":"["}, "_", {"literal":"\n"}, "statements", {"literal":"\n"}, "_", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                statements: data[3]
            }
        }
                },
    {"name": "code_block", "symbols": [{"literal":"["}, "_", "code_block_parameters", "_", {"literal":"\n"}, "statements", {"literal":"\n"}, "_", {"literal":"]"}], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                paramaters: data[2],
                statements: data[5]
            }
        }
                },
    {"name": "code_block_parameters", "symbols": [{"literal":"|"}, "_", "expression_list", "_", {"literal":"|"}], "postprocess": 
        (data) => {
            return data[2]
        }
                },
    {"name": "expression_list", "symbols": ["expression"], "postprocess": 
        (data) => {
            return [data[0]]
        }
                },
    {"name": "expression_list", "symbols": ["expression", "__", "expression_list"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]]
        }
                },
    {"name": "expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "expression", "symbols": ["code_block"], "postprocess": id},
    {"name": "expression", "symbols": ["array_literal"], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "array_literal", "symbols": [{"literal":"{"}, "_", "expression_list", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "array_literal",
                items: data[2]
            }
        }
                },
    {"name": "array_literal", "symbols": [{"literal":"{"}, "_", {"literal":"}"}], "postprocess": 
        () => {
            return {
                type: "array_literal",
                items: []
            }
        }
                },
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["__"]},
    {"name": "__", "symbols": [(myLexer.has("whitespace") ? {type: "whitespace"} : whitespace)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
