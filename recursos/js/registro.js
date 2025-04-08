
(() => {
const formularioRegistro = document.querySelector("#formLogin");


    // Espera a que el formulario de registro exista en el DOM
    function checkForm() {
      const form = document.getElementById("registroForm");
      if (!form) {
        // Si el formulario aún no está, vuelve a intentarlo en 100ms
        setTimeout(checkForm, 100);
        return;
      }
      // Una vez que el formulario existe, inicializamos todo
      initRegistro();
    }

  
    // Función principal de inicialización
    function initRegistro() {
      cargarGeneros();
      togglePassword("contrasena", "mostrarContrasena");
      togglePassword("confirmar_contrasena", "mostrarConfirmarContrasena");
  
      const form = document.getElementById("registroForm");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (validarFormularioRegistro()) {
          enviarRegistro();
        }
      });
    }


    // Funciones para mostrar y limpiar errores
    function mostrarError(input, mensaje) {
      input.classList.add("is-invalid");
      if (input.nextElementSibling) {
        input.nextElementSibling.textContent = mensaje;
      }
    }
  
    function limpiarError(input) {
      input.classList.remove("is-invalid");
      if (input.nextElementSibling) {
        input.nextElementSibling.textContent = "";
      }
    }
  
    // Funciones de validación para cada campo

    // Validamos nombre y apellido con misma función
    function validarNombreApellido(input, campoNombre) {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.value.trim())) {
        mostrarError(input, `El campo ${campoNombre} solo permite letras.`);
        return false;
      }
      limpiarError(input);
      return true;
    }
    // validamos No. Identificacion (pensando en aceptar letras por si es extranjero o pasaporte Preguntar)
    function validarIdentificacion(input) {
      if (!/^\d+$/.test(input.value.trim())) {
        mostrarError(input, "Solo se permiten números.");
        return false;
      }
      limpiarError(input);
      return true;
    }
    // aqui validamos el correo, solo debe funcionar con lo permitido gmail o hotmail
    function validarEmail(input) {
      const correo = input.value.trim();
      if (!/^[\w\.-]+@(gmail|hotmail)\.com$/i.test(correo)) {
        mostrarError(input, "Solo se permiten correos de Gmail o Hotmail.");
        return false;
      }
      limpiarError(input);
      return true;
    }

    function validarContrasena(input) {
      // Debe tener entre 8 y 20 caracteres, al menos 1 mayscula, 1 nmero y 1 caracter espcial.
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#!?¡."$%&()\-_:;,@]).{8,20}$/;
      if (!regex.test(input.value)) {
        mostrarError(input, "La contraseña debe ser entre 8 y 20 caracteres de larga y además, almenos una mayúscula,una minuscula un número y un símbolo o caracter especial.");
        return false;
      }
      limpiarError(input);
      return true;
    }
   
    function validarConfirmacion(input, original) {
      if (input.value !== original.value) {
        mostrarError(input, "Las contraseñas no coinciden.");
        return false;
      }
      limpiarError(input);
      return true;
    }


     // Funcion para ver la contrseña en los campos 
     function togglePassword(inputId, btnId) {
      const input = document.getElementById(inputId);
      const btn = document.getElementById(btnId);
      if (!input || !btn) return;
      btn.addEventListener("click", () => {
        if (input.type === "password") {
          input.type = "text";
          btn.textContent = "🙈";
        } else {
          input.type = "password";
          btn.textContent = "👁️";
        }
      });
    }

    // Función para cargar los géneros en el select
    function cargarGeneros() {
      const generoSelect = document.getElementById("genero");
      if (!generoSelect) {
        console.warn("Elemento select de géneros no encontrado.");
        return;
      }
      fetch("./includes/obtenergeneros.php")
        .then(response => response.json())
        .then(data => {
          data.forEach(genero => {
            const option = document.createElement("option");
            option.value = genero.id_genero;
            option.textContent = genero.nombre_genero;
            generoSelect.appendChild(option);
          });
        })
        .catch(error => console.error("Error cargando géneros:", error));
    }
  
    
    // Función para validar todo el formulario de registro
    function validarFormularioRegistro() {
      let valido = true;
      const nombre = document.getElementById("nombre");
      const apellido = document.getElementById("apellido");
      const identificacion = document.getElementById("identificacion");
      const email = document.getElementById("email");
      const contrasena = document.getElementById("contrasena");
      const confirmarContrasena = document.getElementById("confirmar_contrasena");
      const generoSelect = document.getElementById("genero");
  
      valido = validarNombreApellido(nombre, "nombres") && valido;
      valido = validarNombreApellido(apellido,"apellidos") && valido;
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
      return valido;
    }
  
    // Función para enviar los datos de registro al servidor
    function enviarRegistro() {
      const form = document.getElementById("registroForm");
      const formData = new FormData(form);
      fetch("./includes/registro.php", {
        method: "POST",
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
          console.error("Error al registrar:", error);
          alert("Hubo un problema al registrar.");
        });
    }
  
    // Inicia la comprobación del formulario
    checkForm();
  
  
})();