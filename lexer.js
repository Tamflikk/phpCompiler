class Lexer {
  constructor(input) {
    this.input = input;
    this.tokens = [];
    this.tokenize();
  }

  tokenize() {
    const tokenSpecs = [
      ["ONE_LINE_COMMENT", /^\/\/[^\n]*\n?/, true],
        ["MULTI_LINE_COMMENT", /^\/\*[\s\S]*?\*\//, true],
        ["PHP_TAG_OPEN", /^<\?php\b/],
        ["PHP_TAG_CLOSE", /\?>/],
        ["VARIABLE", /^\$[a-zA-Z_][a-zA-Z0-9_]*/], // Asegúrate de que esta expresión regular es correcta
        ["NUMBER", /^\d+/],
        ["STRING", /^"[^"]*"/],
      ["KEYWORD", /^(if|else|return|function)\b/],
      ["IDENTIFIER", /^[a-zA-Z_][a-zA-Z0-9_]*/],
      ["OPERATOR", /^[+*/=-]/],
      ["SEMICOLON", /^;/],
      ["LPAREN", /^\(/],
      ["RPAREN", /^\)/],
      ["COMPARISON_OPERATOR", /^(==|!=|<=|>=|<|>)/],
      ["COMMA", /^,/],
      ["DOT", /^\./],
      ["WHITESPACE", /^\s+/, true],
    ];

    // Elimina espacios en blanco al inicio del input antes de comenzar el proceso de tokenización
    this.input = this.input.replace(/^\s+/, "");

    console.log(`Input inicial: '${this.input.substring(0, 100)}'`);
    let m;
    while (this.input.length > 0) {
      let matchFound = false;
  
      for (let [type, regex] of tokenSpecs) {
          m = this.input.match(regex);
          if (m) {
              console.log(`Token encontrado: ${type}, Valor: '${m[0]}'`);
              this.tokens.push({ type, value: m[0] });
              this.input = this.input.slice(m[0].length); // Avanza el input correctamente.
              matchFound = true;
              
              // Elimina espacios en blanco al inicio del input después de cada token procesado.
              this.input = this.input.replace(/^\s+/, "");
              
              break; // Sal del bucle una vez que se encuentra una coincidencia.
          }
      }
  
      if (!matchFound) {
          console.error(`Token desconocido: '${this.input.substring(0, 20)}'...`);
          break; // Sal del bucle para evitar bucles infinitos.
      }
  }  
    }
  }

module.exports = { Lexer };
