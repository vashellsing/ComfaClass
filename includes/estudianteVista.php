<?php
session_start(); // Si necesitas sesión para filtrar o controlar acceso
include ('conexion.php'); // Ajusta la ruta al archivo de conexión
header('Content-Type: application/json');

// Prepara la consulta
            id_curso, 
            id_usuario, 
            id_materia, 
            nombre_curso, 
            descripcion_curso, 
            fechacreacion_curso 
        FROM cursos";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $cursos = [];
    
    // Recorre cada fila devuelta por la consulta
    while ($row = $result->fetch_assoc()) {
        // Agrega cada fila al arreglo $cursos
        $cursos[] = $row;
    }

    // Retorna el arreglo en formato JSON
    echo json_encode([
        "success" => true,
        "cursos" => $cursos
    ]);
} else {
    // Si no encuentra registros o ocurre algún problema
    echo json_encode([
        "success" => false,
        "message" => "No se encontraron cursos."
    ]);
}

$conn->close();
?>
