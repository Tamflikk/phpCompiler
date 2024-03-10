const fs = require('fs');
const { Parser } = require('./parser.js');

// Lee el archivo de prueba
const input = fs.readFileSync('test.php', 'utf-8');

const parser = new Parser(input);
try {
    const ast = parser.parse();
    console.log(JSON.stringify(ast, null, 2));
} catch (error) {
    console.error(error);
}