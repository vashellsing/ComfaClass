<?php
include 'conexion.php';
header('Content-Type: application/json');

// Obtener los datos enviados en formato JSON
$datos = json_decode(file_get_contents("php://input"), true);

if (!isset($datos['email']) || !isset($datos['password'])) {
    echo json_encode([
        "success" => false, 
        "message" => "Faltan credenciales."
    ]);
    exit;
}

$email = trim($datos['email']); // Eliminar espacios en blanco
$password = $datos['password'];

// Preparar la consulta para buscar el usuario por correo
$stmt = $conn->prepare("SELECT id_usuario, contrasena_usuario FROM usuarios WHERE correo_usuario = ?");
if (!$stmt) {
    echo json_encode([
        "success" => false, 
        "message" => "Error en la consulta."
    ]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    
    // Detectar si las contraseñas están hasheadas
    if (password_verify($password, $usuario['contrasena_usuario'])) {
        echo json_encode([
            "success" => true, 
            "message" => "Inicio de sesión exitoso."
        ]);
    } elseif ($password === $usuario['contrasena_usuario']) { //  contraseña manual en bd
        echo json_encode([
            "success" => true, 
            "message" => "Inicio de sesión exitoso (sin hash)."
        ]);
    } else {
        echo json_encode([
            "success" => false, 
            "message" => "Credenciales inválidas."
        ]);
    }
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Usuario no encontrado."
    ]);
}

$stmt->close();
$conn->close();
?>
