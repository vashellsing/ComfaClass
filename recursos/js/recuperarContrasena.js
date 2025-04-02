//Script para manejar la lógica de recuperación de contraseña
    // Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        // Obtener referencias a elementos del DOM
        const formularioRecuperarContrasena = document.getElementById('formularioRecuperarContrasena');
        const formularioRecuperacion = document.getElementById('formularioRecuperacion');
        const mensajeExito = document.getElementById('mensajeExito');
        const mensajeError = document.getElementById('mensajeError');
        const textoExito = document.getElementById('textoExito');
        const inputCorreo = document.getElementById('correo');
        
        // Cargar usuarios del localStorage
        let usuariosMock = [];
        const usuariosGuardados = localStorage.getItem('usuariosMock');
        if (usuariosGuardados) {
            usuariosMock = JSON.parse(usuariosGuardados);
        }
        
        // Función para mostrar un mensaje de error
        function mostrarError(mensaje) {
            // Establecer el mensaje de error
            mensajeError.textContent = mensaje;
            // Mostrar el elemento de error
            mensajeError.style.display = 'block';
        }
        
        // Función para verificar si un correo existe
        function correoExiste(correo) {
            // Buscar el correo en la lista de usuarios
            return usuariosMock.some(usuario => usuario.correo === correo);
        }
        
        // Agregar evento de escucha para el envío del formulario
        formularioRecuperarContrasena.addEventListener('submit', function(evento) {
            // Prevenir el comportamiento predeterminado del formulario
            evento.preventDefault();
            
            // Ocultar mensajes anteriores
            mensajeError.style.display = 'none';
            
            // Obtener el valor del correo
            const correo = inputCorreo.value.trim();
            
            // Verificar si el correo está vacío
            if (!correo) {
                mostrarError('Por favor ingrese su correo electrónico');
                return;
            }
            
            // Verificar si el correo existe
            if (!correoExiste(correo)) {
                mostrarError('El correo electrónico no está registrado');
                return;
            }
            
            // Si todo está correcto, mostrar mensaje de éxito
            formularioRecuperacion.style.display = 'none';
            mensajeExito.style.display = 'block';
            textoExito.textContent = `Se han enviado las instrucciones para restablecer su contraseña a ${correo}. Por favor revise su bandeja de entrada.`;
    });
});