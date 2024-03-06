const { Lexer } = require('./lexer.js');

class Parser {
    constructor(input) {
        this.lexer = new Lexer(input);
        this.tokens = this.lexer.tokens;
        this.currentTokenIndex = 0;
    }

    parse() {
        // Implementar según la gramática del lenguaje
        return this.parseExpression();
    }

    parseExpression() {
        // Implementación simplificada
        const token = this.tokens[this.currentTokenIndex];
        if (!token) throw new Error("Unexpected end of input");

        switch (token.type) {
            case 'NUMBER':
            case 'STRING':
                return this.advanceToken();
            // Añade más casos aquí según sea necesario
            default:
                throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    advanceToken() {
        return this.tokens[this.currentTokenIndex++];
    }
}

module.exports = { Parser };