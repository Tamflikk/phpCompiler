class SymbolTable {
    constructor() {
      this.symbols = {};
    }
  
    define(name, type, scope) {
      this.symbols[name] = { type, scope };
    }
  
    resolve(name) {
      return this.symbols[name];
    }
  }
  
  module.exports = SymbolTable;