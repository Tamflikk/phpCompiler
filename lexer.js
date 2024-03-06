class Lexer {
    constructor(input) {
        this.input = input;
        this.tokens = [];
        this.tokenize();
    }

    tokenize() {
        const tokenSpecs = [
            ['NUMBER', /^\d+/], 
            ['STRING', /^"[^"]*"/], 
            ['WHITESPACE', /^\s+/, true], // Ignorado
            ['KEYWORD', /^(if|else|return|function)\b/], 
            ['IDENTIFIER', /^[a-zA-Z_]\w*/],
            ['OPERATOR', /^[+*/=-]/],
        ];

        let m;
        while (this.input.length > 0) {
            let matchFound = false;

            for (let [type, regex, ignore] of tokenSpecs) {
                if (m = this.input.match(regex)) {
                    if (!ignore) {
                        this.tokens.push({type, value: m[0]});
                    }
                    this.input = this.input.slice(m[0].length); // Actualiza la entrada
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) throw new Error(`Unknown token: ${this.input}`);
        }
    }
}

module.exports = { Lexer };
