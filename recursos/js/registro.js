document.addEventListener("DOMContentLoaded", () => {

    // Cargar géneros
    const generoSelect = document.getElementById('genero');
    fetch('/ComfaClass/includes/obtenergeneros.php')

        .then(response => response.json())
        .then(data => {
            data.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.id_genero;
                option.textContent = genero.nombre_genero;
                generoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando géneros:', error));

    // Validaciones
    const mostrarError = (input, mensaje) => {
        input.classList.add("is-invalid");
        input.nextElementSibling.textContent = mensaje;
    };

    const limpiarError = (input) => {
        input.classList.remove("is-invalid");
        input.nextElementSibling.textContent = "";
    };

    const validarNombre = (input) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.value.trim())) {
            mostrarError(input, "Solo se permiten letras.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarApellido = (input) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.value.trim())) {
            mostrarError(input, "Solo se permiten letras.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarIdentificacion = (input) => {
        if (!/^\d+$/.test(input.value.trim())) {
            mostrarError(input, "Solo se permiten números.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarEmail = (input) => {
        const correo = input.value.trim();
        if (!/^[\w\.-]+@(gmail|hotmail)\.com$/i.test(correo)) {
            mostrarError(input, "Solo se permiten correos de Gmail o Hotmail.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarContrasena = (input) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#!?¡."$%&()\-_:;,@]).{8,12}$/;
        if (!regex.test(input.value)) {
            mostrarError(input, "Debe tener entre 8 y 12 caracteres, al menos 1 mayúscula, 1 número y 1 símbolo.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarConfirmacion = (input, original) => {
        if (input.value !== original.value) {
            mostrarError(input, "Las contraseñas no coinciden.");
            return false;
        }
        limpiarError(input);
        return true;
    };

    // Mostrar / ocultar contraseñas
    const togglePassword = (inputId, btnId) => {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        btn.addEventListener("click", () => {
            input.type = input.type === "password" ? "text" : "password";
            btn.textContent = input.type === "text" ? "🙈" : "👁️";
        });
    };

    togglePassword("contrasena", "mostrarContrasena");
    togglePassword("confirmar_contrasena", "mostrarConfirmarContrasena");


    
    // IMPORTANTE: Definir form
    const form = document.getElementById("registroForm");

    // Enviar al servidor
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const apellido = document.getElementById("apellido");
        const identificacion = document.getElementById("identificacion");
        const email = document.getElementById("email");
        const contrasena = document.getElementById("contrasena");
        const confirmarContrasena = document.getElementById("confirmar_contrasena");

        let valido = true;

        valido = validarNombre(nombre) && valido;
        valido = validarApellido(apellido) && valido;
        valido = validarIdentificacion(identificacion) && valido;
        valido = validarEmail(email) && valido;
        valido = validarContrasena(contrasena) && valido;
        valido = validarConfirmacion(confirmarContrasena, contrasena) && valido;

        if (!generoSelect.value) {
            mostrarError(generoSelect, "Seleccione una opción.");
            valido = false;
        } else {
            limpiarError(generoSelect);
        }

        if (valido) {
            const formData = new FormData(form);
            fetch('../includes/registro.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                if (data.includes("Registro exitoso")) {
                    alert("Registro exitoso. ¡Bienvenido a Confaclass!");
                    form.reset();
                } else {
                    alert("Error al registrar: " + data);
                }
            })
            .catch(error => {
                console.error('Error al registrar:', error);
                alert("Hubo un problema al registrar.");
            });
        }
    });

});
