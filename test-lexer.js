// This is a test file for the lexer which was
// initially created to play around. It is no longer
// needed.
const fs = require("fs").promises;
const lexer = require("./lexer");

async function main() {
    const code = (await fs.readFile("example1.x")).toString();
    lexer.reset(code);
    let token;
    while (true) {
        token = lexer.next();
        if (token) {
            console.log(token.type, JSON.stringify(token.value));
        } else {
            break;
        }
    }
}

main().catch(err => console.log(err.stack));