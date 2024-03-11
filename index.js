const fs = require('fs');
const Lexer = require('./lexer'); // Asume que lexer.js está en el mismo directorio
const Parser = require('./parser'); // Asume que parser.js está en el mismo directorio

const input = fs.readFileSync('test.php', 'utf8');
const lexer = new Lexer(input);
const parser = new Parser(lexer.tokens);
const ast = parser.parse();

console.log(JSON.stringify(ast, null, 2));