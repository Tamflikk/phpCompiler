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
      ["PHP_TAG_OPEN", /^<\?php\b/, true], // Agregar 'true' para ignorar este token
      ["PHP_TAG_CLOSE", /\?>/, true],
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

    let m;
    while (this.input.length > 0) {
      let matchFound = false;

      for (let [type, regex, ignore] of tokenSpecs) {
        if ((m = this.input.match(regex))) {
          if (!ignore) {
            this.tokens.push({ type, value: m[0] });
          }
          this.input = this.input.slice(m[0].length);
          matchFound = true;
          break;
        }
      }

      if (!matchFound) throw new Error(`Unknown token: ${this.input}`);
    }
  }
}

module.exports = { Lexer };
