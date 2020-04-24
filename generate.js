const fs = require("fs").promises;
const path = require("path");

const runtime = `
/*
Runtime functions:
*/

function print(...args) {
    console.log(...args);
}

function add(...args) {
    return args.reduce((sum, num) => sum + num, 0);
}

function sub(x, y) {
    return x - y;
}

function mul(...args) {
    return args.reduce((sum, num) => sum * num, 1);
}

function div(x, y) {
    return x / y;
}

function mod(x, y) {
    return x % y;
}

function abs(n) {
    return Math.abs(n);
}

function pow(n, m) {
    return Math.pow(n, m);
}

function sqrt(x) {
    return Math.sqrt(x);
}
`;

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a file name.");
        return;
    }
    const astCode = (await fs.readFile(filename)).toString();
    const ast = JSON.parse(astCode);
    const jsCode = generate(ast);
    const baseName = path.basename(filename, ".x.ast");
    const jsFilename = `${baseName}.js`;
    await fs.writeFile(jsFilename, jsCode);
    console.log(`Wrote ${jsFilename}.`);
}

function generate(node) {
    if (node.type === "program") {
        return node.body.map(generate).join(";\n") + ";\n" + runtime;
    } else if (node.type === "assignment") {
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === "function_call") {
        const funName = node.fun_name.value;
        const params = node.parameters.map(generate)
            .join(", ");
        return `${funName}(${params})`;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "number") {
        return String(node.value);
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "function_definition") {
        const funName = node.fun_name.value;
        const params = node.parameters.map(generate)
            .join(", ");
        const body = node.body.map(generate).join(";\n") + ";";
        const indentedBody = body.split("\n").map(line => "\t" + line).join("\n");
        return `function ${funName} (${params}) {\n${indentedBody}\n}`;
    } else {
        throw new Error(`Unknown node type: ${node.type}`);
    }
}

main().catch(err => console.log(err.stack));