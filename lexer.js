class Lexer {
  constructor(input) {
    this.input = input;
    this.tokens = [];
    this.tokenize();
  }

  tokenize() {
    const regex = /\s*(<\?php|\?>|\$[a-zA-Z_][a-zA-Z0-9_]*|[0-9]+(\.[0-9]+)?|[+\-*/=]|\(|\)|{|}|if|else|function|return|,[a-zA-Z_][a-zA-Z0-9_]*|\s+)/g;
    let m;
    while ((m = regex.exec(this.input)) !== null) {
      let token = m[0].trim();
      if (token.length === 0) continue;
      this.tokens.push(token);
    }
  }
}

module.exports = Lexer;
