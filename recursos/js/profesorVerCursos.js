
document.addEventListener('DOMContentLoaded', function () {

    // Función para mostrar un curso en la lista de cursos registrados
    function mostrarCursoEnLista(indiceCurso) {
        const curso = cursos[indiceCurso];
        const nuevoCurso = document.createElement('li');
        nuevoCurso.textContent = `Curso: ${curso.nombreCurso}, Facultad: ${curso.facultad}, Carrera: ${curso.carrera}, Materia: ${curso.materia}, Horario: ${curso.horario}, Descripción: ${curso.descripcion}`;

        const botonVerAlumnos = document.createElement('button');
        botonVerAlumnos.textContent = 'Ver Alumnos';
        botonVerAlumnos.addEventListener('click', () => mostrarAlumnos(indiceCurso));

        nuevoCurso.appendChild(botonVerAlumnos);
        listacursos.appendChild(nuevoCurso);
    }






});