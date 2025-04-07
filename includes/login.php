<?php
session_start(); // Inicia la sesión
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

// Preparar la consulta para buscar el usuario por correo.
// Se asume que la tabla tiene un campo 'rol' (1=invitado, 2=profesor, 3=estudiante)
$stmt = $conn->prepare("SELECT id_usuario, contrasena_usuario, id_rol FROM usuarios WHERE correo_usuario = ?");
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
    
    // Verificar la contraseña (hasheada o en texto plano, aunque se recomienda siempre el hash)
    if (password_verify($password, $usuario['contrasena_usuario']) || $password === $usuario['contrasena_usuario']) {
        // Guardar la información del usuario en la sesión
        $_SESSION['id_usuario'] = $usuario['id_usuario'];
        $_SESSION['correo_usuario'] = $email;
        $_SESSION['id_rol'] = $usuario['id_rol'];

        // Definir la URL de redirección según el rol
        switch ($usuario['id_rol']) {
            case 1: 
                $redirectUrl = 'invitadoVista'; // o la ruta que corresponda
                break;
            case 2: 
                $redirectUrl = 'profesorVista';
                break;
            case 3: 
                $redirectUrl = 'estudianteVista';
                break;
            default:
                $redirectUrl = 'paginas/default';
                break;
        }
        
        echo json_encode([
            "success" => true, 
            "message" => "Inicio de sesión exitoso.",
            "redirect" => $redirectUrl // Se envía la ruta de redirección al frontend
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
