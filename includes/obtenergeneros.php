<?php
require_once 'conexion.php'; 

$sql = "SELECT id_genero, nombre FROM generos";
$result = $conn->query($sql);

$generos = array();
while ($row = $result->fetch_assoc()) {
    $generos[] = $row;
}

echo json_encode($generos);
?>
