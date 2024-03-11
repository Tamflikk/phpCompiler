const fs = require('fs');
const Lexer = require('./lexer');
const Parser = require('./parser');
const IntermediateCodeGenerator = require('./intermediate_code_generator');

const input = fs.readFileSync('test.php', 'utf8');
const lexer = new Lexer(input);
const parser = new Parser(lexer.tokens);
const ast = parser.parse();

const generator = new IntermediateCodeGenerator(ast);
const intermediateCode = generator.generate();

console.log(intermediateCode.join('\n'));