
document.addEventListener('DOMContentLoaded', function () {

    // Función para mostrar la lista de alumnos de un curso
    function mostrarAlumnos(indiceCurso) {
        const curso = cursos[indiceCurso];
        let tablaHTML = '<table>';
        tablaHTML += '<thead><tr><th>Nombre y Apellidos</th><th>Correo</th><th>Curso Pertenece</th></tr></thead><tbody>';

        curso.alumnos.forEach(alumno => {
            tablaHTML += `<tr><td>${alumno.nombreApellidos}</td><td>${alumno.correo}</td><td>${alumno.cursopertenece}</td></tr>`;
        });

        tablaHTML += '</tbody></table>';
        listaAlumnosDiv.innerHTML = tablaHTML;
    }


    // Inicialización de alumnos (pueden venir de una base de datos)
    // alumnos = [
    //     { nombreApellidos: 'Juan Pérez', correo: 'juan@example.com', cursopertenece: '123-456-7890' },
    //     { nombreApellidos: 'María García', correo: 'maria@example.com', cursopertenece: '987-654-3210' }
    // ];

    // if (cursos.length > 0) {
    //     cursos[0].alumnos = alumnos;
    // }


});