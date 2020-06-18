const fs = require("fs").promises;
const { readFileSync } = require("fs");
const path = require("path");
const RUNTIME = readFileSync(path.join(__dirname, "runtime.js")).toString();

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
        return node.body.map(generate).join(";\n") + ";\n" + RUNTIME;
    } else if (node.type === "assignment") {
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === "function_call") {
        const sourceFunName = node.fun_name.value;
        const funName = sourceFunName === "if" ? "$if" : sourceFunName;
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
        return generateFunction(node.body.statements, node.parameters, funName);
    } else if (node.type === "code_block") {
        return generateFunction(node.statements, node.parameters);
    } else if (node.type === "array_literal") {
        const items = node.items.map(generate).join(", ");
        return `[${items}]`;
    } else if (node.type === "set_literal") {
        const items = node.items.map(generate).join(", ");
        return `new Set([${items}])`;
    } else if (node.type === "dict_literal") {
        const entries = node.entries.map((entry) => {
            const [key, value] = entry;
            const keyExpr = generate(key);
            const valueExpr = generate(value);
            return `[${keyExpr}, ${valueExpr}]`;
        }).join(", ");
        return `new Map([${entries}])`;
    } else {
        throw new Error(`Unknown node type: ${node.type}`);
    }
}

function generateFunction(statements, parameters, name = "") {
    const body = statements.map((statement, idx) => {
        const js = generate(statement);
        if (idx === statements.length - 1) {
            return `return ${js}`;
        } else {
            return js;
        }
    }).join(";\n") + ";";
    const indentedBody = body.split("\n").map(line => "\t" + line).join("\n");
    const params = parameters.map(generate).join(", ");
    return `function ${name}(${params}) {\n${indentedBody}\n}`;
}

main().catch(err => console.log(err.stack));