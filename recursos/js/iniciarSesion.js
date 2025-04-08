document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formularioLogin');
    const inputCorreo = document.getElementById('correo');
    const inputContrasena = document.getElementById('contrasena');

    const errorCorreo = document.getElementById('errorCorreo');
    const errorContrasena = document.getElementById('errorContrasena');
    const errorGeneral = document.getElementById('errorGeneral');
    const mensajeExito = document.getElementById('mensajeExito');

    function ocultarMensajes() {
        errorCorreo.classList.add('d-none');
        errorContrasena.classList.add('d-none');
        errorGeneral.classList.add('d-none');
        mensajeExito.classList.add('d-none');
    }

    function mostrarError(elemento, mensaje) {
        elemento.textContent = mensaje;
        elemento.classList.remove('d-none');
    }

    function mostrarExito(mensaje) {
        mensajeExito.textContent = mensaje;
        mensajeExito.classList.remove('d-none');
    }

    function validarCorreo(correo) {
        // Solo acepta correos @gmail.com o @hotmail.com
        const regex = /^[^\s@]+@(gmail|hotmail)\.com$/i;
        return regex.test(correo);
    }

    function validarContrasena(contrasena) {
        // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(contrasena);
    }

    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        ocultarMensajes();

        const correo = inputCorreo.value.trim();
        const contrasena = inputContrasena.value.trim();

        if (!correo || !contrasena) {
            mostrarError(errorGeneral, "Debe completar todos los campos");
            return;
        }

        if (!validarCorreo(correo)) {
            mostrarError(errorCorreo, "Solo se permiten correos @gmail.com o @hotmail.com");
            return;
        }

        if (!validarContrasena(contrasena)) {
            mostrarError(errorContrasena, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
            return;
        }

        mostrarExito("Credenciales correctas");
    });

    inputCorreo.addEventListener('input', () => errorCorreo.classList.add('d-none'));
    inputContrasena.addEventListener('input', () => errorContrasena.classList.add('d-none'));
});
