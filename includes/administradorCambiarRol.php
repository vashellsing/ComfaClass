<?php
session_start();
require_once 'conexion.php';
header('Content-Type: application/json');

// 1) Verificar que el usuario logueado es administrador (rol 4)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 4) {
    echo json_encode(["success" => false, "message" => "No autorizado."]);
    exit;
}

// 2) Leer los datos enviados por POST en JSON
$data = json_decode(file_get_contents('php://input'), true);
if (empty($data['id']) || empty($data['nuevo_rol'])) {
    echo json_encode(["success" => false, "message" => "Parámetros faltantes."]);
    exit;
}
$id       = intval($data['id']);
$nuevoRol = intval($data['nuevo_rol']);

// 3) Ejecutar la actualización en la base de datos
$stmt = $conn->prepare("UPDATE usuarios SET id_rol = ? WHERE id_usuario = ?");
$stmt->bind_param("ii", $nuevoRol, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
