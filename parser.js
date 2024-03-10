const { Lexer } = require('./lexer.js');

class Parser {
    constructor(input) {
        this.lexer = new Lexer(input);
        this.tokens = this.lexer.tokens;
        this.currentTokenIndex = 0;
    }

    parse() {
        const ast = {
            type: 'Program',
            body: []
        };

        while (this.currentTokenIndex < this.tokens.length) {
            const statement = this.parseStatement();
            if (statement) {
                ast.body.push(statement);
            }
        }

        return ast;
    }

    parseStatement() {
        const token = this.tokens[this.currentTokenIndex];
    
        switch (token.type) {
            case 'KEYWORD':
                return this.parseKeywordStatement(token.value);
            case 'IDENTIFIER':
                return this.parseIdentifierStatement();
            case 'PHP_TAG_CLOSE':
                this.advanceToken();
                return null;
            case 'NUMBER':
            case 'STRING':
            case 'COMPARISON_OPERATOR':
            case 'LPAREN':
                return this.parseExpression();
            case 'ONE_LINE_COMMENT':
                this.advanceToken();
                return null;
            case 'MULTI_LINE_COMMENT':
                this.advanceToken();
                return null;
            default:
                throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    parseKeywordStatement(keyword) {
        switch (keyword) {
            case 'if':
                return this.parseIfStatement();
            case 'function':
                return this.parseFunctionDefinition();
            default:
                throw new Error(`Unexpected keyword: ${keyword}`);
        }
    }

    parseIdentifierStatement() {
        const identifier = this.tokens[this.currentTokenIndex].value;
        this.advanceToken();
    
        if (this.tokens[this.currentTokenIndex].type === 'OPERATOR' &&
            this.tokens[this.currentTokenIndex].value === '=') {
            this.advanceToken();
    
            if (this.currentTokenIndex >= this.tokens.length) {
                throw new Error('Unexpected end of input after assignment operator');
            }
    
            const value = this.parseExpression();
            return {
                type: 'VariableAssignment',
                identifier,
                value
            };
        } else {
            throw new Error('Expected assignment operator');
        }
    }

    parseIfStatement() {
        this.advanceToken();

        const condition = this.parseExpression();
        this.expectToken('LPAREN');
        this.expectToken('RPAREN');

        const thenBranch = this.parseStatement();
        let elseBranch = null;

        if (this.tokens[this.currentTokenIndex]?.value === 'else') {
            this.advanceToken();
            elseBranch = this.parseStatement();
        }

        return {
            type: 'IfStatement',
            condition,
            thenBranch,
            elseBranch
        };
    }

    parseFunctionDefinition() {
        this.advanceToken();

        const name = this.expectToken('IDENTIFIER').value;
        this.expectToken('LPAREN');

        const params = [];
        if (this.tokens[this.currentTokenIndex].type !== 'RPAREN') {
            params.push(this.expectToken('IDENTIFIER').value);
            while (this.tokens[this.currentTokenIndex]?.type === 'COMMA') {
                this.advanceToken();
                params.push(this.expectToken('IDENTIFIER').value);
            }
        }

        this.expectToken('RPAREN');

        const body = this.parseStatement();

        return {
            type: 'FunctionDefinition',
            name,
            params,
            body
        };
    }

    parseExpression() {
        let left = this.parsePrimary();
    
        while (
            this.tokens[this.currentTokenIndex]?.type === 'OPERATOR' ||
            this.tokens[this.currentTokenIndex]?.type === 'COMPARISON_OPERATOR'
        ) {
            const operator = this.tokens[this.currentTokenIndex].value;
            this.advanceToken();
            const right = this.parsePrimary();
    
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            };
        }
    
        return left;
    }
    
    parsePrimary() {
        const token = this.tokens[this.currentTokenIndex];
        if (!token) throw new Error("Unexpected end of input");
    
        switch (token.type) {
            case 'NUMBER':
            case 'STRING':
                this.advanceToken();
                return {
                    type: 'Literal',
                    value: token.value
                };
            case 'IDENTIFIER':
                this.advanceToken();
                return {
                    type: 'Identifier',
                    value: token.value
                };
            case 'LPAREN':
                this.advanceToken();
                const expression = this.parseExpression();
                this.expectToken('RPAREN');
                return expression;
            case 'COMPARISON_OPERATOR':
                this.advanceToken();
                const right = this.parsePrimary();
                return {
                    type: 'BinaryExpression',
                    operator: token.value,
                    left: {
                        type: 'Literal',
                        value: null
                    },
                    right
                };
            default:
                throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    advanceToken() {
        this.currentTokenIndex++;
    }

    expectToken(type) {
        const token = this.tokens[this.currentTokenIndex];
        if (token.type !== type) {
            throw new Error(`Expected token of type ${type}, but found ${token.type}`);
        }
        this.advanceToken();
        return token;
    }
}

module.exports = { Parser };