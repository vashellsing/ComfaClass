  -- *******************************
-- Inserción de datos en comfaclass
-- *******************************

-- 1. Facultad (única)
INSERT INTO `facultades` (id_facultad, nombre_facultad) VALUES
(1, 'Facultad de Ingenierías');

-- 2. Roles
INSERT INTO `roles` (id_rol, nombre_rol) VALUES
(1, 'Invitado'),
(2, 'Profesor'),
(3, 'Estudiante'),
(4, 'Administrador');

-- 3. Géneros
INSERT INTO `generos` (id_genero, nombre_genero) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- 4. Carreras (solo dos registros: Sistemas y Mecatrónica)
INSERT INTO `carreras` (id_carrera, id_facultad, nombre_carrera) VALUES
(1, 1, 'Ingeniería en Sistemas'),
(2, 1, 'Ingeniería Mecatrónica');

-- 5. Materias (se agregan ejemplos pertinentes)

-- Para Ingeniería en Sistemas (id_carrera = 1)
INSERT INTO `materias` (id_materia, id_carrera, nombre_materia) VALUES
(1, 1, 'Programación'),
(2, 1, 'Base de Datos'),
(3, 1, 'Sistemas Operativos'),
(4, 1, 'Redes de Computadores');

-- Para Ingeniería Mecatrónica (id_carrera = 2)
INSERT INTO `materias` (id_materia, id_carrera, nombre_materia) VALUES
(5, 2, 'Control Automático'),
(6, 2, 'Mecánica de Materiales'),
(7, 2, 'Electrónica Industrial'),
(8, 2, 'Robótica');

-- 6. Usuarios (ejemplos de registros; las contraseñas son hashes simulados)
INSERT INTO `usuarios` (id_usuario, id_rol, id_genero, identificacion_usuario, nombre_usuario, apellido_usuario, correo_usuario, contrasena_usuario, fotoPerfil_usuario) VALUES
(1, 2, 1, '1001', 'Juan', 'Perez', 'juan.perez@comfaclass.edu', '$2y$10$hashprofesor', NULL),
(2, 3, 2, '1002', 'Maria', 'Lopez', 'maria.lopez@comfaclass.edu', '$2y$10$hashestudiante', NULL),
(3, 1, 1, '1003', 'Pedro', 'Garcia', 'pedro.garcia@comfaclass.edu', '$2y$10$hashinvitado', NULL),
(4, 4, 1, '1004', 'Admin', 'Root', 'admin@comfaclass.edu', '$2y$10$hashadmin', NULL);

-- 7. Cursos (ejemplos; asegúrate de que el id_materia corresponda a las materias insertadas)
INSERT INTO `cursos` (id_curso, id_usuario, id_materia, nombre_curso, descripcion_curso) VALUES
(1, 1, 1, 'Curso de Programación', 'Aprende fundamentos de programación.'),
(2, 1, 2, 'Curso de Base de Datos', 'Introducción a la gestión de bases de datos.'),
(3, 2, 3, 'Curso de Sistemas Operativos', 'Explora el funcionamiento de los sistemas operativos.');

-- 8. Inscripciones (ejemplos de inscripción de usuarios a cursos)
INSERT INTO `inscripciones` (id_inscripcion, id_curso, id_usuario) VALUES
(1, 1, 2),  -- Maria se inscribe en "Curso de Programación"
(2, 2, 2),  -- Maria también se inscribe en "Curso de Base de Datos"
(3, 3, 3);  -- Pedro se inscribe en "Curso de Sistemas Operativos"
