<?php
$host = "localhost";       // Cambia si es diferente
$user = "root";            // Tu usuario de MySQL
$password = "";            // Tu contraseña de MySQL
$dbname = "comfaclass";    // Nombre de tu base de datos

$conn = new mysqli($host, $user, $password, $dbname);

// Validar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
