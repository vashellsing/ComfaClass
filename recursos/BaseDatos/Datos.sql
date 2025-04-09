-- Insertar roles
INSERT INTO roles (id_rol, nombre_rol) VALUES
(1, 'Invitado'),
(2, 'Profesor'),
(3, 'Estudiante'),
(4, 'Administrador');

-- Insertar géneros
INSERT INTO generos (id_genero, nombre_genero) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- Insertar facultad
INSERT INTO facultades (nombre_facultad) VALUES
('Facultad de Ingenierías');

-- Insertar carreras
INSERT INTO carreras (id_facultad, nombre_carrera) VALUES
(1, 'Ingeniería de Sistemas'),
(1, 'Ingeniería Mecatrónica');

-- Insertar materias
-- Para Ingeniería de Sistemas (id_carrera = 1)
INSERT INTO materias (id_carrera, nombre_materia) VALUES
(1, 'Programación I'),
(1, 'Estructuras de Datos'),
(1, 'Bases de Datos');

-- Para Ingeniería Mecatrónica (id_carrera = 2)
INSERT INTO materias (id_carrera, nombre_materia) VALUES
(2, 'Circuitos Eléctricos'),
(2, 'Mecánica Aplicada'),
(2, 'Control Automático');

-- Insertar usuarios
INSERT INTO usuarios (
  id_rol, id_genero, identificacion_usuario, 
  nombre_usuario, apellido_usuario, 
  correo_usuario, contrasena_usuario, fotoPerfil_usuario
) VALUES
(2, 1, '1234567890', 'Carlos', 'Pérez', 'carlos.perez@comfaclass.edu', 'abc123456789', NULL),
(3, 2, '2234567891', 'Laura', 'Gómez', 'laura.gomez@comfaclass.edu', 'pass456123', NULL),
(3, 1, '3234567892', 'Andrés', 'Rodríguez', 'andres.rodriguez@comfaclass.edu', 'mypass7890', NULL),
(1, 3, '4234567893', 'Alex', 'Moreno', 'alex.moreno@comfaclass.edu', 'guestpass', NULL),
(2, 2, '5234567894', 'Sofía', 'Martínez', 'sofia.martinez@comfaclass.edu', 'teachpass', NULL),
(4, 1, '9999999999', 'Admin', 'Root', 'admin@comfaclass.edu', 'adminsecurepass123', NULL);

-- Insertar cursos
-- Nota: Asegúrate de que los IDs de materias sean los correctos según el orden de inserción
INSERT INTO cursos (id_usuario, id_materia, nombre_curso, descripcion_curso) VALUES
(1, 1, 'Curso Básico de Programación', 'Introducción a la programación estructurada'),
(2, 4, 'Circuitos para principiantes', 'Aprendizaje básico de circuitos eléctricos'),
(3, 2, 'Estructuras Lógicas', 'Estructuras de datos aplicadas a problemas reales'),
(5, 5, 'Mecánica I', 'Fundamentos de mecánica aplicada'),
(1, 3, 'Bases de Datos Relacionales', 'Modelo entidad-relación y SQL'),
(2, 6, 'Automatización Industrial', 'Principios de control automático en ingeniería');

-- Insertar inscripciones
INSERT INTO inscripciones (id_curso, id_usuario) VALUES
(1, 2),
(1, 3),
(2, 3),
(3, 4),
(5, 2);
