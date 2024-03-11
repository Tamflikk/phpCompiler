const SymbolTable = require('./symbol_table');

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
    this.symbolTable = new SymbolTable();
  }

  parse() {
    const ast = { type: 'Program', body: [] };
    while (!this.endOfTokens()) {
      const stmt = this.parseStatement();
      if (stmt) {
        ast.body.push(stmt);
      }
    }
    return ast;
  }

  parseStatement() {
    switch (this.tokens[this.current]) {
      case '<?php':
      case '?>':
        this.current++;
        return null;
      case 'if':
        return this.parseIfStatement();
      default:
        if (/\$[a-zA-Z_]\w*/.test(this.tokens[this.current])) {
          return this.parseAssignment();
        } else if (/[a-zA-Z_]\w*/.test(this.tokens[this.current])) {
          return this.parseFunctionCall();
        }
    }
    throw new Error(`Unknown statement: ${this.tokens[this.current]}`);
  }

  parseIfStatement() {
    this.current++; // Skip 'if'
    this.consume('('); // Expect '('
    const test = this.parseExpression();
    this.consume(')'); // Expect ')'
    const consequent = this.parseBlockStatement();
    let alternate = null;
    if (this.tokens[this.current] === 'else') {
      this.current++; // Skip 'else'
      alternate = this.parseBlockStatement();
    }
    return {
      type: 'IfStatement',
      test,
      consequent,
      alternate,
    };
  }

  parseBlockStatement() {
    this.consume('{');
  
    // Crear una nueva tabla de símbolos para el ámbito del bloque
    const blockSymbolTable = new SymbolTable();
    this.symbolTable.push(blockSymbolTable);
  
    const body = [];
    while (this.tokens[this.current] !== '}') {
      body.push(this.parseStatement());
    }
  
    // Restaurar la tabla de símbolos previa
    this.symbolTable.pop();
  
    this.consume('}');
    return {
      type: 'BlockStatement',
      body,
    };
  }

  parseAssignment() {
    const variableName = this.tokens[this.current++];
    this.consume('=');
    const expression = this.parseExpression();
  
    // Registrar la variable en la tabla de símbolos
    this.symbolTable.define(variableName.slice(1), 'variable', 'global');
  
    return { type: 'AssignmentExpression', name: variableName, value: expression };
  }

  parseExpression() {
    let left = this.parseMember();
    while (this.current < this.tokens.length && this.isOperator(this.tokens[this.current])) {
      const operator = this.tokens[this.current++];
      const right = this.parseMember();
  
      // Verificar la compatibilidad de tipos de los operandos
      const leftType = this.getType(left);
      const rightType = this.getType(right);
      if (!this.isTypeCompatible(leftType, operator, rightType)) {
        throw new Error(`Tipo incompatible: ${leftType} ${operator} ${rightType}`);
      }
  
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
      };
    }
    return left;
  }

  parseFunctionCall() {
    const name = this.tokens[this.current++];
    this.consume('(');
    const args = [];
    while (this.tokens[this.current] !== ')') {
      args.push(this.parseExpression());
      if (this.tokens[this.current] === ',') {
        this.current++;
      }
    }
    this.consume(')');
    return {
      type: 'CallExpression',
      callee: { type: 'Identifier', name },
      arguments: args,
    };
  }

  parseMember() {
    const token = this.tokens[this.current++];
    if (/^\d+$/.test(token)) {
      return { type: 'NumericLiteral', value: token };
    } else if (/\$[a-zA-Z_]\w*/.test(token)) {
      return { type: 'VariableReference', name: token };
    } else if (/[a-zA-Z_]\w*/.test(token)) {
      return { type: 'Identifier', name: token };
    }
    throw new Error(`Unexpected token: ${token}`);
  }

  consume(expected) {
    if (this.tokens[this.current] === expected) {
      this.current++;
    } else {
      throw new Error(`Expected token "${expected}" but found "${this.tokens[this.current]}"`);
    }
  }

  isOperator(token) {
    return ['+', '-', '*', '/'].includes(token);
  }

  endOfTokens() {
    return this.current >= this.tokens.length;
  }

  getType(node) {
    if (node.type === 'VariableReference') {
      const symbol = this.symbolTable.resolve(node.name);
      return symbol ? symbol.type : 'unknown';
    } else if (node.type === 'NumericLiteral') {
      return 'number';
    } else if (node.type === 'Identifier') {
      // Suponer que los identificadores son funciones y tienen tipo 'function'
      return 'function';
    }
    // Agregar casos para otros tipos de nodos
  }

  isTypeCompatible(leftType, operator, rightType) {
    if (leftType === 'unknown') {
      // Si el tipo de la izquierda es desconocido, permitir la operación
      return true;
    }
    if (rightType === 'unknown') {
      // Si el tipo de la derecha es desconocido, permitir la operación
      return true;
    }
  
    // Implementar lógica para verificar la compatibilidad de tipos según el operador
    if (operator === '+') {
      return (
        (leftType === 'number' && rightType === 'number') ||
        (leftType === 'string' && rightType === 'string') ||
        (leftType === 'function' && rightType === 'number') || 
        (leftType === 'number' && rightType === 'function') 
      );
    }
    // Agregar reglas para otros operadores
  }
}

module.exports = Parser;
