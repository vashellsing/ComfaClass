<?php
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //  Capturar datos del formulario
    $nombre = trim($_POST["nombre"]);
    $apellido = trim($_POST["apellido"]);
    $identificacion = trim($_POST["identificacion"]);
    $email = trim($_POST["email"]);
    $contrasena = $_POST["contrasena"];
    $genero = intval($_POST["genero"]);
    $rol = 1; // 1= Invitado por defecto

    // Validar campos vacíos
    if (empty($nombre) || empty($apellido) || empty($identificacion) || empty($email) || empty($contrasena) || empty($genero)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    //  Verificar si el correo ya existe
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE correo_usuario = ?");
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

    // Verificar si el correo ya existe
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE identificacion_usuario = ?");
    $stmt->bind_param("s", $identificacion);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Ese numero de identificación ya está registrado.";
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Encriptar la contraseña
    $hash_contrasena = password_hash($contrasena, PASSWORD_DEFAULT);

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre_usuario, apellido_usuario, identificacion_usuario, correo_usuario, contrasena_usuario, id_genero, id_rol) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisssi", $nombre, $apellido, $identificacion, $email, $hash_contrasena, $genero, $rol);

    if ($stmt->execute()) {
       
        echo "Registro exitoso";
    } else {
        echo "Error al registrar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
