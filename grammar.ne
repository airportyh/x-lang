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
function_call -> %identifier _ "(" _ parameter_list _ ")"
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
    %identifier _ "(" _ parameter_list _ ")"  _ code_block
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
    
code_block -> "[" _ "\n" statements "\n" _ "]"
    {%
        (data) => {
            return {
                type: "code_block",
                statements: data[3]
            }
        }
    %}

parameter_list
    -> null
        {%
            () => []
        %}
    | expression
        {%
            (data) => {
                return [data[0]]
            }
        %}
    |  expression __ parameter_list
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
    -> %number  {% id %}
    |  %string  {% id %}


# optional whitespace
_ 
    -> null
    |  __

# mandatory whitespace
__ -> %whitespace

