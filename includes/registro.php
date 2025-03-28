<?php
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Capturar datos del formulario
    $nombre = trim($_POST["nombre"]);
    $apellido = trim($_POST["apellido"]);
    $identificacion = trim($_POST["identificacion"]);
    $email = trim($_POST["email"]);
    $contrasena = $_POST["contrasena"];
    $genero = intval($_POST["genero"]);
    $rol = 1; // Invitado por defecto

    // 2. Validar campos vacíos
    if (empty($nombre) || empty($apellido) || empty($identificacion) || empty($email) || empty($contrasena) || empty($genero)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    // 3. Verificar si el correo ya existe
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE correo = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "El correo ya está registrado.";
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // 4. Encriptar la contraseña
    $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);

    // 5. Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, apellido, identificacion, correo, contraseña, id_genero, id_rol) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisssi", $nombre, $apellido, $identificacion, $email, $hashed_password, $genero, $rol);

    if ($stmt->execute()) {
       
        echo "Registro exitoso";
    } else {
        echo "Error al registrar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
