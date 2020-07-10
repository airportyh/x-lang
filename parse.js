const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs = require("fs").promises;
const path = require("path");
const util = require("util");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a file name.");
        return;
    }
    const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);

    const baseDir = path.dirname(filename);
    if (parser.results.length > 1) {
        console.warn("The parse tree generates multiple results.");
        for (let i = 0; i < parser.results.length; i++) {
            const ast = parser.results[i];
            const astFilename = path.join(baseDir, path.basename(filename) + i + ".ast");
            await fs.writeFile(astFilename, JSON.stringify(ast, null, "  "));
            console.log(`Wrote ${astFilename}.`);
        }
    } else if (parser.results.length === 0) {
        console.error("Unexpected end of file");
        process.exit(1);
    } else {
        const astFilename = path.join(baseDir, path.basename(filename) + ".ast");
        const ast = parser.results[0];
        await fs.writeFile(astFilename, JSON.stringify(ast, null, "  "));
        console.log(`Wrote ${astFilename}.`);
    }
}

main().catch(err => console.log(err.stack));