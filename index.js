const { Lexer } = require('./lexer.js');
const { Parser } = require('./parser.js');

const input = `codigo PHP aqui`;
const lexer = new Lexer(input);
const parser = new Parser(input);

try {
    const ast = parser.parse();
    console.log(ast);
} catch (error) {
    console.error(error);
}
