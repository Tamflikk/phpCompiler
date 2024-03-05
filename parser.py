# parser.py

import ply.yacc as yacc
from lexer import tokens  # Importa la lista de tokens del archivo lexer.py

# Asignación de variable
def p_assignment(p):
    'assignment : IDENTIFIER EQUALS expression'
    p[0] = ('assignment', p[1], p[3])

# Expresión: esto debería expandirse para manejar diferentes tipos de expresiones
def p_expression(p):
    '''expression : expression PLUS expression
                  | expression MINUS expression
                  | expression TIMES expression
                  | expression DIVIDE expression
                  | NUMBER'''
    if len(p) == 2:  # Solo un número
        p[0] = ('number', p[1])
    else:
        p[0] = ('binop', p[1], p[2], p[3])

# If-else statement
def p_if_else(p):
    'if_else : IF LPAREN expression RPAREN statement ELSE statement'
    p[0] = ('if-else', p[3], p[5], p[7])

# Statement: una sentencia puede ser una asignación, un if-else o una expresión
def p_statement(p):
    '''statement : assignment
                 | if_else
                 | expression'''
    p[0] = p[1]

# Definir una regla de error para manejar errores sintácticos
def p_error(p):
    print("Syntax error found!")

# Construir el analizador sintáctico
parser = yacc.yacc()

# Función para probar el analizador sintáctico
def test_parser(input_string):
    result = parser.parse(input_string)
    print(result)

# Código para probar el analizador sintáctico con un ejemplo
test_code = '''
$a = 5;
if ($a > 3) {
    echo "Hello, world!";
} else {
    echo "Goodbye!";
}
'''

test_parser(test_code)
