<?php
require_once 'conexion.php';
header('Content-Type: application/json');

// (Opcional) Verificar sesión/autorización de administrador si lo deseas
session_start();
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 4) {
    echo json_encode([]);
    exit;
}

// Nuevo SQL con JOIN para traer el nombre del rol
$sql = "
  SELECT 
    u.id_usuario   AS id,
    u.nombre_usuario AS nombre,
    u.identificacion_usuario AS identificacion,
    u.correo_usuario AS correo,
    r.nombre_rol   AS rol_actual
  FROM usuarios u
  JOIN roles r 
    ON u.id_rol = r.id_rol
";

$resultado = $conn->query($sql);
$usuarios = [];

while ($fila = $resultado->fetch_assoc()) {
    $usuarios[] = [
        "id"         => $fila["id"],
        "nombre"     => $fila["nombre"],
        "identificacion" => $fila["identificacion"],
        "correo"     => $fila["correo"],
        "rol_actual" => $fila["rol_actual"]
    ];
}

echo json_encode($usuarios);
