import ply.lex as lex

#PHP keyWords
keywords = {
    'echo': 'ECHO',
    'if': 'IF',
    'else': 'ELSE',
    'while': 'WHILE',
    'function': 'FUNCTION',
    'return': 'RETURN',
    'for': 'FOR',
    'foreach': 'FOREACH',
    'break': 'BREAK',
    'continue': 'CONTINUE',
    'class': 'CLASS',
    'public': 'PUBLIC',
    'protected': 'PROTECTED',
    'private': 'PRIVATE',
    'new': 'NEW',
    'try': 'TRY',
    'catch': 'CATCH',
    'throw': 'THROW',
    'array': 'ARRAY',
    'print': 'PRINT',
    'static': 'STATIC',
    'var': 'VAR'
}

tokens = [
    'IDENTIFIER', 'NUMBER', 'FLOAT', 'STRING',
    'PLUS', 'MINUS', 'TIMES', 'DIVIDE', 'EQUALS', 'NOTEQUAL',
    'LPAREN', 'RPAREN', 'LBRACE', 'RBRACE', 'LBRACKET', 'RBRACKET',
    'SEMICOLON', 'COMMA', 'DOT', 'COLON', 'QUESTION',
    'AND', 'OR', 'NOT', 'LESS', 'GREATER', 'LESSEQUAL', 'GREATEREQUAL',
    'PLUSPLUS', 'MINUSMINUS', 'PLUSEQUAL', 'MINUSEQUAL', 'TIMESEQUAL', 'DIVIDEEQUAL',
    'ARROW', 'ANDAND', 'OROR',
    'SINGLE_LINE_COMMENT', 'MULTI_LINE_COMMENT'
] + list(keywords.values())

#tokens definition
t_PLUS = r'\+'
t_MINUS = r'-'
t_TIMES = r'\*'
t_DIVIDE = r'/'
t_EQUALS = r'='
t_NOTEQUAL = r'!='
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_SEMICOLON = r';'
t_COMMA = r','
t_DOT = r'\.'
t_COLON = r':'
t_QUESTION = r'\?'
t_AND = r'&'
t_OR = r'\|'
t_NOT = r'!'
t_LESS = r'<'
t_GREATER = r'>'
t_LESSEQUAL = r'<='
t_GREATEREQUAL = r'>='
t_PLUSPLUS = r'\+\+'
t_MINUSMINUS = r'--'
t_PLUSEQUAL = r'\+='
t_MINUSEQUAL = r'-='
t_TIMESEQUAL = r'\*='
t_DIVIDEEQUAL = r'/='
t_ARROW = r'->'
t_ANDAND = r'&&'
t_OROR = r'\|\|'

#Rules for id's and keywords
def t_IDENTIFIER(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = keywords.get(t.value, 'IDENTIFIER')
    return t

#Rule for floats
def t_FLOAT(t):
    r'\d+\.\d*|\.\d+'
    t.value = float(t.value)
    return t

#Rule for integers
def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

#Rule for Strings
def t_STRING(t):
    r'\".*?\"'
    t.value = t.value[1:-1]
    return t

#Rules for comments
def t_SINGLE_LINE_COMMENT(t):
    r'//.*'
    pass

def t_MULTI_LINE_COMMENT(t):
    r'/\*.*?\*/'
    pass 

#Rule for inline numbers
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

#A string that contains ignored characters (spaces and tabs)
t_ignore = ' \t'

# Handle errors
def t_error(t):
    print(f"Illegal character '{t.value[0]}'")
    t.lexer.skip(1)

#lex constructor
lexer = lex.lex()

#Example
if __name__ == "__main__":
    data = '''
    echo "Hello, world!";
    // Esto es un comentario
    /* Esto es un comentario
    multilínea */
    $a = 5.3;
    '''

    lexer.input(data)

    # Tokenize
    while True:
        tok = lexer.token()
        if not tok:
            break
        print(tok)
