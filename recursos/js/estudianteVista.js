document.addEventListener("DOMContentLoaded", () => {
  fetch("./includes/iniciarSesion.php")
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const cursosContainer = document.getElementById("cursosContainer");

        data.cursos.forEach(curso => {
          // Creamos un div con clases de Bootstrap
          const divCurso = document.createElement("div");
          divCurso.classList.add("col-md-4", "mb-3");

          // Construimos el contenido de la tarjeta
          // Muestra todos los campos que consideres relevantes
          divCurso.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${curso.nombre_curso}</h5>
                <p class="card-text">
                  <strong>Descripción:</strong> ${curso.descripcion_curso}
                </p>
                <p class="card-text">
                  <strong>ID Curso:</strong> ${curso.id_curso} <br/>
                  <strong>ID Usuario:</strong> ${curso.id_usuario} <br/>
                  <strong>ID Materia:</strong> ${curso.id_materia}
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    Creado el: ${curso.fechacreacion_curso}
                  </small>
                </p>
              </div>
            </div>
          `;

          // Insertamos la tarjeta en el contenedor
          cursosContainer.appendChild(divCurso);
        });
      } else {
        // Si no se encontraron cursos o hubo un error
        alert("No se pudieron obtener los cursos. " + data.message);
      }
    })
    .catch(error => {
      console.error("Error al conectarse con el servidor:", error);
      alert("Error al conectarse con el servidor.");
    });
});
