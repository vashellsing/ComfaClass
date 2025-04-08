document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    const formcursos = document.getElementById('formcursos');
    const listacursos = document.getElementById('listacursos');
    const listaAlumnosDiv = document.getElementById('listaAlumnos');
    const facultadSelect = document.getElementById('facultad');
    const carreraSelect = document.getElementById('carrera');
    const materiaSelect = document.getElementById('materia');
    const botonCancelar = document.getElementById('cancelarCurso');
    const botonVerAlumnos = document.getElementById('verAlumnos');
    let cursos = [];
    let alumnos = [];

    // Datos de carreras y materias (pueden venir de una base de datos)
    const carrerasPorFacultad = {
        ingenieria: ['Sistemas', 'Civil', 'Industrial', 'Mecátronica'],
        ciencias: ['Matemáticas', 'Física', 'CalculoDiferencial', 'calculo integral'],
        artes: ['Música', 'Pintura', 'Teatro']
    };

    const materiasPorCarrera = {
        Sistemas: ['Programación', 'Bases de Datos', 'Redes'],
        Civil: ['Estática', 'Dinámica', 'Hidráulica'],
        Industrial: ['Producción', 'Logística', 'Calidad'],
        Mecátronica: ['Mecánica', 'Electrónica', 'Control'],
        Matemáticas: ['Cálculo', 'Álgebra', 'Geometría'],
        Física: ['Mecánica', 'Termodinámica', 'Electromagnetismo'],
        CalculoDiferencial: ['Límites', 'Derivadas', 'Integrales'],
        calculoIntegral: ['Integrales', 'Ecuaciones Diferenciales', 'Series'],
        Música: ['Armonía', 'Composición', 'Interpretación'],
        Pintura: ['Técnicas Pictóricas', 'Historia del Arte', 'Dibujo'],
        Teatro: ['Actuación', 'Dirección', 'Dramaturgia']
    };

    // Función para limpiar el formulario de cursos
    function limpiarFormulario() {
        formcursos.reset();
    }

    // Función para manejar el cambio de facultad y actualizar carreras y materias
    function actualizarCarrerasMaterias() {
        const facultadSeleccionada = facultadSelect.value;
        carreraSelect.innerHTML = '<option value="">Seleccione una carrera</option>';
        materiaSelect.innerHTML = '<option value="">Seleccione una materia</option>';

        if (facultadSeleccionada) {
            carrerasPorFacultad[facultadSeleccionada].forEach(carrera => {
                const option = document.createElement('option');
                option.value = carrera;
                option.textContent = carrera;
                carreraSelect.appendChild(option);
            });
        }
    }

    // Función para manejar el cambio de carrera y actualizar materias
    function actualizarMaterias() {
        const carreraSeleccionada = carreraSelect.value;
        materiaSelect.innerHTML = '<option value="">Seleccione una materia</option>';

        if (carreraSeleccionada) {
            materiasPorCarrera[carreraSeleccionada].forEach(materia => {
                const option = document.createElement('option');
                option.value = materia;
                option.textContent = materia;
                materiaSelect.appendChild(option);
            });
        }
    }

    // Función para crear un nuevo curso y añadirlo a la lista
    function crearCurso(event) {
        event.preventDefault();

        const nombreCurso = document.getElementById('nombreCurso').value;
        const facultad = facultadSelect.value;
        const carrera = carreraSelect.value;
        const materia = materiaSelect.value;
        const horario = document.getElementById('horario').value;
        const descripcion = document.getElementById('descripcion').value;///
//Alerta
        if (crearCurso) {
            alert('Curso creado con éxito.');
    
          } else {
            alert('Error al crear el curso. Por favor, inténtalo de nuevo.');
          }

    }

    botonCancelar.addEventListener('click', limpiarFormulario);
    facultadSelect.addEventListener('change', actualizarCarrerasMaterias);
    carreraSelect.addEventListener('change', actualizarMaterias);
    formcursos.addEventListener('submit', crearCurso);

});