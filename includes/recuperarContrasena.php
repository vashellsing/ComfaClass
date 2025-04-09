<?php
include('conexion.php');
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener datos JSON enviados desde JavaScript
    $json = file_get_contents("php://input");
    $datos = json_decode($json, true);

    // Validación básica
    if (!isset($datos["email"]) || empty($datos["email"])) {
        echo json_encode([
            "success" => false,
            "message" => "El correo electrónico es obligatorio."
        ]);
        exit;
    }

    $email = trim($datos["email"]);

    // Verificar si el correo existe en la tabla "usuarios" con el campo correcto
    $sql = "SELECT id_usuario, nombre_usuario FROM usuarios WHERE correo_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            $usuario = $resultado->fetch_assoc();

            // En este punto podrías generar un token y enviarlo al correo (opcional)
            echo json_encode([
                "success" => true,
                "message" => "Se han enviado las instrucciones de recuperación al correo: $email"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "No se encontró una cuenta registrada con ese correo."
            ]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al consultar la base de datos."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);
}
?>
