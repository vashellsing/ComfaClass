document.addEventListener("DOMContentLoaded", function () {
    const nombreUsuario = document.getElementById("nombreUsuario");
    const menuOpciones = document.getElementById("menuOpciones");
    const cerrarSesion = document.getElementById("cerrarSesion");

    if (!nombreUsuario || !menuOpciones || !cerrarSesion) {
        console.warn("Elementos del header no encontrados.");
        return;
    }

    // Simulación de usuario (puede cambiarse por datos de una API o LocalStorage)
    const usuario = {
        nombre: "Juan Pérez",
        tipo: "administrador",
    };

    nombreUsuario.textContent = usuario.nombre;

    let opcionesHTML = "";
    if (usuario.tipo === "administrador") {
        opcionesHTML += `<li><a href="vistaAdmin.html">Panel de Administración</a></li>`;
    } else if (usuario.tipo === "profesor") {
        opcionesHTML += `<li><a href="vistaProfesor.html">Panel del Profesor</a></li>`;
    } else if (usuario.tipo === "estudiante") {
        opcionesHTML += `<li><a href="vistaEstudiante.html">Mis Cursos</a></li>`;
    }

    menuOpciones.innerHTML = opcionesHTML;

    cerrarSesion.addEventListener("click", function () {
        alert("Sesión cerrada correctamente");
        window.location.href = "login.html";
    });
});
