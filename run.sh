node parse.js $1
node generate.js $1.ast
node ${1%.x}.js