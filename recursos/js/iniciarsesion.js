// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario de inicio de sesión
    const formularioLogin = document.getElementById('formularioLogin');
    
    // Obtener referencias a los campos del formulario
    const inputCorreo = document.getElementById('correo');
    const inputContrasena = document.getElementById('contrasena');
    
    // Obtener referencias a los elementos de error y mensaje de éxito
    const errorCorreo = document.getElementById('errorCorreo');
    const errorContrasena = document.getElementById('errorContrasena');
    const errorGeneral = document.getElementById('errorGeneral');
    const mensajeExito = document.getElementById('mensajeExito');
    
    // Simular una base de datos de usuarios (en una aplicación real, esto estaría en el servidor)
    let usuariosMock = [];
    
    // Simular un registro de intentos fallidos de inicio de sesión
    let intentosFallidosLogin = {};
    
    // Simular un registro de cuentas bloqueadas
    let cuentasBloqueadas = {};
    
    // Función para ocultar todos los mensajes
    function ocultarTodosMensajes() {
        // Ocultar cada mensaje individual
        errorCorreo.style.display = 'none';
        errorContrasena.style.display = 'none';
        errorGeneral.style.display = 'none';
        mensajeExito.style.display = 'none';
    }
    
    // Función para mostrar un mensaje de error específico
    function mostrarError(elementoError, mensaje) {
        // Establecer el mensaje de error
        elementoError.textContent = mensaje;
        // Mostrar el elemento de error
        elementoError.style.display = 'block';
    }
    
    // Función para mostrar un mensaje de éxito
    function mostrarExito(mensaje) {
        // Establecer el mensaje de éxito
        mensajeExito.textContent = mensaje;
        // Mostrar el elemento de mensaje de éxito
        mensajeExito.style.display = 'block';
    }
    
    // Función para verificar si una cuenta está bloqueada
    function estaCuentaBloqueada(correo) {
        // Verificar si el correo está en el registro de cuentas bloqueadas
        if (cuentasBloqueadas[correo]) {
            // Obtener el tiempo de bloqueo
            const tiempoBloqueo = new Date(cuentasBloqueadas[correo]);
            const ahora = new Date();
            // Calcular las horas transcurridas desde el bloqueo
            const horasDesdeBloqueo = (ahora.getTime() - tiempoBloqueo.getTime()) / (1000 * 60 * 60);
            
            // Si han pasado menos de 24 horas, la cuenta sigue bloqueada
            if (horasDesdeBloqueo < 24) {
                return true;
            } else {
                // Si han pasado más de 24 horas, desbloquear la cuenta
                delete cuentasBloqueadas[correo];
                delete intentosFallidosLogin[correo];
                // Guardar en localStorage
                localStorage.setItem('cuentasBloqueadas', JSON.stringify(cuentasBloqueadas));
                localStorage.setItem('intentosFallidosLogin', JSON.stringify(intentosFallidosLogin));
                return false;
            }
        }
        // Si no está en el registro, no está bloqueada
        return false;
    }
    
    // Función para incrementar los intentos fallidos de inicio de sesión
    function incrementarIntentosFallidos(correo) {
        // Si no hay intentos previos, inicializar en 1, de lo contrario incrementar
        intentosFallidosLogin[correo] = (intentosFallidosLogin[correo] || 0) + 1;
        
        // Si alcanza 3 intentos fallidos, bloquear la cuenta
        if (intentosFallidosLogin[correo] >= 3) {
            cuentasBloqueadas[correo] = new Date().toISOString();
            // Guardar en localStorage
            localStorage.setItem('cuentasBloqueadas', JSON.stringify(cuentasBloqueadas));
        }
        
        // Guardar en localStorage
        localStorage.setItem('intentosFallidosLogin', JSON.stringify(intentosFallidosLogin));
        
        // Devolver el número de intentos
        return intentosFallidosLogin[correo];
    }
    
    // Función para buscar un usuario por correo electrónico
    function buscarUsuarioPorCorreo(correo) {
        // Buscar el usuario en la lista de usuarios
        return usuariosMock.find(usuario => usuario.correo === correo);
    }
    
    // Agregar evento de escucha para el envío del formulario
    formularioLogin.addEventListener('submit', function(evento) {
        // Prevenir el comportamiento predeterminado del formulario
        evento.preventDefault();
        
        // Ocultar todos los mensajes anteriores
        ocultarTodosMensajes();
        
        // Obtener los valores de los campos
        const correo = inputCorreo.value.trim();
        const contrasena = inputContrasena.value.trim();
        
        // Verificar si hay campos vacíos
        if (!correo || !contrasena) {
            mostrarError(errorGeneral, "Debe completar todos los campos");
            return;
        }
        
        // Verificar si la cuenta está bloqueada
        if (estaCuentaBloqueada(correo)) {
            mostrarError(errorGeneral, "Su cuenta ha sido bloqueada por 24 horas debido a múltiples intentos fallidos.");
            return;
        }
        
        // Buscar el usuario por correo electrónico
        const usuario = buscarUsuarioPorCorreo(correo);
        
        // Verificar si el usuario existe
        if (!usuario) {
            mostrarError(errorCorreo, "El usuario no existe");
            return;
        }
        
        // Verificar si la contraseña es correcta
        if (usuario.contrasena !== contrasena) {
            // Incrementar los intentos fallidos
            const intentos = incrementarIntentosFallidos(correo);
            
            // Mostrar mensaje de error
            mostrarError(errorContrasena, "Contraseña incorrecta");
            
            // Si alcanza 3 intentos fallidos, mostrar mensaje de bloqueo
            if (intentos >= 3) {
                mostrarError(errorGeneral, "Su cuenta ha sido bloqueada por 24 horas debido a múltiples intentos fallidos.");
            }
            
            return;
        }
        
        // Si el inicio de sesión es exitoso, resetear los intentos fallidos
        if (intentosFallidosLogin[correo]) {
            delete intentosFallidosLogin[correo];
            localStorage.setItem('intentosFallidosLogin', JSON.stringify(intentosFallidosLogin));
        }
        
        // Guardar la sesión del usuario
        const sesion = {
            correo: usuario.correo,
            nombre: usuario.nombre,
            rol: usuario.rol
        };
        
        // Guardar la sesión en localStorage
        localStorage.setItem('sesionActual', JSON.stringify(sesion));
        
        // Redirigir según el rol del usuario
        if (usuario.rol === 'invitado') {
            // Redirigir a la página de aprobación pendiente
            window.location.href = 'aprobacion-pendiente.html';
        } else if (usuario.rol === 'estudiante' || usuario.rol === 'profesor') {
            // Redirigir al dashboard correspondiente
            window.location.href = `panel-control.html?rol=${usuario.rol}`;
        } else {
            // Redirigir al dashboard general
            window.location.href = 'panel-control.html';
        }
    });
    
    // Cargar datos del localStorage al iniciar
    const usuariosGuardados = localStorage.getItem('usuariosMock');
    const intentosFallidosGuardados = localStorage.getItem('intentosFallidosLogin');
    const cuentasBloqueadasGuardadas = localStorage.getItem('cuentasBloqueadas');
    
    if (usuariosGuardados) {
        usuariosMock = JSON.parse(usuariosGuardados);
    }
    
    if (intentosFallidosGuardados) {
        intentosFallidosLogin = JSON.parse(intentosFallidosGuardados);
    }
    
    if (cuentasBloqueadasGuardadas) {
        cuentasBloqueadas = JSON.parse(cuentasBloqueadasGuardadas);
    }
    
    // Verificar si hay un parámetro de registro exitoso en la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    if (parametrosURL.get('registrado') === 'true') {
        mostrarExito('Registro exitoso. Ahora puede iniciar sesión.');
    }
    
    // Agregar eventos para limpiar errores cuando el usuario escribe
    inputCorreo.addEventListener('input', function() {
        errorCorreo.style.display = 'none';
    });
    
    inputContrasena.addEventListener('input', function() {
        errorContrasena.style.display = 'none';
    });
});