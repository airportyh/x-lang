@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

program
    -> statements
        {%
            (data) => {
                return {
                    type: "program",
                    body: data[0]
                };
            }
        %}

statements
    -> null
        {%
            () =>[]
        %}
    |  _ statement _
        {%
            (data) => [data[1]]
        %}
    |  _ statement _ "\n":+ statements
        {%
            (data) => [data[1], ...data[4]]
        %}

statement
    -> assignment           {% id %}
    |  function_call        {% id %}
    |  function_definition  {% id %}
    |  if_statement         {% id %}
    |  %identifier          {% id %}

assignment -> %identifier _ "=" _ expression
    {%
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
    %}

# doIt(a b c)
function_call -> %identifier _ "(" _ expression_list _ ")"
    {%
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters: data[4]
            }
        }
    %}

# doIt(a b c) [
#    ...
# ]
function_definition -> 
    %identifier _ "(" _ expression_list _ ")"  _ code_block_wo_parameters
    {%
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameters: data[4],
                body: data[8]
            }
        }
    %}
    
code_block
    -> code_block_wo_parameters     {% id %}
    |  "[" _ code_block_parameters _ "\n" statements "\n" _ "]"
        {%
            (data) => {
                return {
                    type: "code_block",
                    parameters: data[2],
                    statements: data[5]
                }
            }
        %}

code_block_wo_parameters
    -> "[" _ "\n" statements "\n" _ "]"
        {%
            (data) => {
                return {
                    type: "code_block",
                    statements: data[3]
                }
            }
        %}

code_block_parameters
    -> "|" _ expression_list _ "|"
        {%
            (data) => {
                return data[2]
            }
        %}

expression_list
    -> expression
        {%
            (data) => {
                return [data[0]]
            }
        %}
    |  expression __ expression_list
        {%
            (data) => {
                return [data[0], ...data[2]]
            }
        %}

expression
    -> %identifier    {% id %}
    |  literal        {% id %}
    |  function_call  {% id %}
    |  code_block     {% id %}

literal
    -> %number                   {% id %}
    |  %string                   {% id %}
    |  empty_collection_literal  {% id %}
    |  sequence_literal          {% id %}
    |  dictionary_literal        {% id %}
    |  %regex                    {% id %}

# { 1 2 3 4 }
# A sequence is either an array or a set
# A collection is either a sequence or a dictionary

sequence_literal
    -> optional_tag "{" _ expression_list _ "}"
        {%
            (data) => {
                const tagName = data[0] || "array";
                if (tagName === "dict") {
                    throw new Error("Tagged a sequence as a dict");
                }
                return {
                    type: tagName + "_literal",
                    items: data[3]
                }
            }
        %}

empty_collection_literal
    -> optional_tag "{" _ "}"
        {%
            (data) => {
                const tagName = data[0] || "array";
                if (tagName === "dict") {
                    return {
                        type: "dict_literal",
                        entries: [] // array of 2-element arrays: [key, value]
                    };
                } else {
                    return {
                        type: tagName + "_literal",
                        items: []
                    }
                }
            }
        %}

dictionary_literal
    -> optional_tag "{" _ key_value_pair_list _ "}"
        {%
            (data) => {
                const tagName = data[0] || "dict";
                if (tagName !== "dict") {
                    throw new Error("Tagged a dict as a " + tagName);
                }
                return {
                    type: "dict_literal",
                    entries: data[3]
                };
            }
        %}

key_value_pair_list
    -> key_value_pair
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  key_value_pair __ key_value_pair_list
        {%
            (data) => {
                return [data[0], ...data[2]];
            }
        %}

key_value_pair
    -> expression _ ":" _ expression
        {%
            (data) => {
                return [data[0], data[4]];
            }
        %}

optional_tag
    -> null {% () => null %}
    |  tag  {% id %}

tag ->
    "<" tag_name ">"
    {%
        (data) => {
            return data[1].value;
        }
    %}

tag_name
    -> "array"   {% id %}
    |  "dict"    {% id %}
    |  "set"     {% id %}

if_statement
    -> "if" __ expression MLWS code_block MLWS "else" MLWS code_block
        {%
            (data) => {
                return {
                    type: "if_statement",
                    conditional: data[2],
                    consequent: data[4],
                    alternate: data[8]
                }
            }
        %}

# MLWS
MLWS
    -> MLWSC
    |  MLWSC MLWS

MLWSC
    -> __
    |  %newline

# optional whitespace
_ 
    -> null
    |  __

# mandatory whitespace
__ -> %whitespace

