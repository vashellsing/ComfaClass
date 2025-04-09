-- 1. Facultades (base para carreras)
INSERT INTO `facultades` (`id_facultad`, `nombre_facultad`) VALUES
(1, 'Facultad de Ingenierías');

-- 2. Carreras (depende de facultades)
INSERT INTO `carreras` (`id_carrera`, `id_facultad`, `nombre_carrera`) VALUES
(1, 1, 'Ingeniería de Sistemas'),
(2, 1, 'Ingeniería Mecatrónica');

-- 3. Materias (depende de carreras)
INSERT INTO `materias` (`id_materia`, `id_carrera`, `nombre_materia`) VALUES
(1, 1, 'Programación I'),
(2, 1, 'Estructuras de Datos'),
(3, 1, 'Bases de Datos'),
(4, 2, 'Circuitos Eléctricos'),
(5, 2, 'Mecánica Aplicada'),
(6, 2, 'Control Automático');

-- 4. Roles (base para usuarios)
INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(4, 'Administrador'),
(3, 'Estudiante'),
(1, 'Invitado'),
(2, 'Profesor');

-- 5. Géneros (base para usuarios)
INSERT INTO `generos` (`id_genero`, `nombre_genero`) VALUES
(2, 'Femenino'),
(1, 'Masculino'),
(3, 'Otro');

-- 6. Usuarios (depende de roles y géneros)
INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `id_genero`, `identificacion_usuario`, `nombre_usuario`, `apellido_usuario`, `correo_usuario`, `contrasena_usuario`, `fotoPerfil_usuario`) VALUES
(1, 2, 1, '1234567890', 'Carlos', 'Pérez', 'carlos.perez@gmail.com', 'abc123456789', NULL),
(2, 3, 2, '2234567891', 'Laura', 'Gómez', 'laura.gomez@hotmail.com', 'pass456123', NULL),
(3, 3, 1, '3234567892', 'Andrés', 'Rodríguez', 'andres.rodriguez@gmail.com', 'mypass7890', NULL),
(4, 1, 3, '4234567893', 'Alex', 'Moreno', 'alex.moreno@hotmail.com', 'guestpass', NULL),
(5, 2, 2, '5234567894', 'Sofía', 'Martínez', 'sofia.martinez@gmail.com', 'teachpass', NULL),
(6, 4, 1, '9999999999', 'Admin', 'Root', 'admin.root@gmail.com', 'adminsecurepass123', NULL);

-- 7. Cursos (depende de usuarios y materias)
INSERT INTO `cursos` (`id_curso`, `id_usuario`, `id_materia`, `nombre_curso`, `descripcion_curso`, `fechacreacion_curso`) VALUES
(1, 1, 1, 'Curso Básico de Programación', 'Introducción a la programación estructurada', '2025-04-09 19:53:17'),
(2, 2, 4, 'Circuitos para principiantes', 'Aprendizaje básico de circuitos eléctricos', '2025-04-09 19:53:17'),
(3, 3, 2, 'Estructuras Lógicas', 'Estructuras de datos aplicadas a problemas reales', '2025-04-09 19:53:17'),
(4, 5, 5, 'Mecánica I', 'Fundamentos de mecánica aplicada', '2025-04-09 19:53:17'),
(5, 1, 3, 'Bases de Datos Relacionales', 'Modelo entidad-relación y SQL', '2025-04-09 19:53:17'),
(6, 2, 6, 'Automatización Industrial', 'Principios de control automático en ingeniería', '2025-04-09 19:53:17');

-- 8. Inscripciones (depende de cursos y usuarios)
INSERT INTO `inscripciones` (`id_inscripcion`, `id_curso`, `id_usuario`, `fecha_inscripcion`) VALUES
(1, 1, 2, '2025-04-09 19:53:17'),
(2, 1, 3, '2025-04-09 19:53:17'),
(3, 2, 3, '2025-04-09 19:53:17'),
(4, 3, 4, '2025-04-09 19:53:17'),
(5, 5, 2, '2025-04-09 19:53:17');
