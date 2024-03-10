<?php
//Prueba de Variables y Asignación
$variable = 10;
$otra_variable = "Hola mundo";

//Prueba de Operaciones Aritméticas
$resultado = 1 + 2;

//Prueba de Condiciones
if ($variable > 10) {
    echo "Mayor que 10";
} else {
    echo "Menor o igual a 10";
}

//Prueba de Bucles
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

//Prueba de Funciones
function suma($a, $b) {
    return $a + $b;
}
echo suma(1, 2);

//Prueba de Clases y Objetos
class Coche {
    public $color;
    
    public function __construct($color) {
        $this->color = $color;
    }
}
$miCoche = new Coche("rojo");

//Prueba de Manejo de Errores
//$incompleto = 

//Prueba de Comentarios
//Esto es un comentario
#Esto también es un comentario
/*
Este es un comentario
de varias líneas
*/
$con_comentario = "Test";
?>

