(() => {
  let usuarios = [];
  let usuarioSeleccionado = null;
  let nuevoRolSeleccionado = null;

  function init() {
    const tabla = document.getElementById("cuerpo-tabla-usuarios");
    if (!tabla) {
      setTimeout(init, 100);
      return;
    }
    cargarUsuarios();
  }

  function cargarUsuarios() {
    fetch("./includes/administradorVista.php")
      .then((res) => res.json())
      .then((data) => {
        usuarios = data;
        mostrarUsuarios(data);
      })
      .catch((error) => {
        console.error("Error al cargar usuarios:", error);
      });
  }

  function mostrarUsuarios(lista) {
    const cuerpo = document.getElementById("cuerpo-tabla-usuarios");
    cuerpo.innerHTML = "";

    lista.forEach((usuario) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.identificacion}</td>
        <td>${usuario.correo}</td>
        <td class="text-center">${usuario.rol_actual}</td>
        <td>
            <label for="select-${usuario.id}" style="position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;">
              Nuevo rol para ${usuario.nombre}
            </label>
            <select id="select-${usuario.id}" class="form-select" data-id="${usuario.id}">
              <option value="2" ${usuario.rol_actual === 'Profesor' ? 'selected' : ''}>Profesor</option>
              <option value="3" ${usuario.rol_actual === 'Estudiante' ? 'selected' : ''}>Estudiante</option>
            </select>
        </td>
        <td class="text-center">
          <button class="btn btn-primary btn-sm btn-cambiar-rol" 
                  data-id="${usuario.id}" 
                  data-nombre="${usuario.nombre}" 
                  data-correo="${usuario.correo}">
            Cambiar rol
          </button>
        </td>
      `;

      cuerpo.appendChild(fila);
    });

    agregarEventos();
  }

  // 1) Registra los listeners en cada botón "Cambiar rol"
function agregarEventos() {
  document.querySelectorAll('.btn-cambiar-rol').forEach(btn =>
    btn.addEventListener('click', abrirModal)
  );
}

// 2) Prepara el modal de Bootstrap y variables globales
const modal = new bootstrap.Modal(document.getElementById('modal-confirmar-cambio'));




// 3) Al hacer clic en "Cambiar rol" abrimos el modal
function abrirModal(e) {
  const btn    = e.currentTarget;
  usuarioSeleccionado = btn.getAttribute('data-id');
  const select = document.getElementById(`select-${usuarioSeleccionado}`);
  nuevoRolSeleccionado = select.value;
  const textoRol = select.options[select.selectedIndex].text;
  const nombre   = btn.getAttribute('data-nombre');

  document.getElementById('mensaje-confirmacion').innerText =
    `Vas a asignar el rol "${textoRol}" a ${nombre}. ¿Confirmas?`;

  modal.show();
}

// 4) Cuando el usuario confirma en el modal, llamamos al PHP
document.getElementById('boton-confirmar-cambio')
  .addEventListener('click', () => {
    fetch('./includes/administradorCambiarRol.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: usuarioSeleccionado,
        nuevo_rol: nuevoRolSeleccionado
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        modal.hide();
        cargarUsuarios();           // refresca la tabla
      } else {
        alert('Error: ' + res.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error de conexión.');
    });
  });








  init();
})();
