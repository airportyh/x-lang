const moo = require("moo");

module.exports = moo.compile({
    whitespace:      /[ \t]+/,
    number:          { match: /0|[1-9][0-9]*/, value: Number },
    string:          /"(?:\\["\\]|[^\n"\\])*"/,
    regex:           /\/(?:\\["\\]|[^\/])*\//,
    left_bracket:    '[',
    right_bracket:   ']',
    left_brace:      '{',
    right_brace:     '}',
    left_paren:      '(',
    right_paren:     ')',
    assignment_op:   "=",
    bar:             '|',
    less_than:       '<',
    greater_than:    '>',
    color:           ':',
    identifier:      /[a-zA-Z_][a-zA-Z0-9_]*/,
    newline:         { match: /\n/, lineBreaks: true },
});

/*
Not Done:

plus
minus
times
divide
left bracket
right bracket
colon
if keyword
else keyword
for keyword
in keyword
class keyword
*/
