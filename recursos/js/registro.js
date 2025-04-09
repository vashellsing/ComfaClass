(() => {
  // Espera a que el formulario exista en el DOM
  function checkForm() {
    const form = document.getElementById("registroForm");
    if (!form) {
      setTimeout(checkForm, 100);
      return;
    }
    initRegistro();
  }

  // Inicialización
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

  // Mostrar Errores
  function mostrarError(input, mensajeHtml) {
    input.classList.add("is-invalid");

    // Busca si justo después del input viene un botón (el de mostrar contraseña)
    let next = input.nextElementSibling;
    let referenciaInsercion;

    if (next && next.tagName === "BUTTON") {
      // Si hay un botón, insertamos el feedback tras el botón
      referenciaInsercion = next;
    } else {
      // Si no, lo insertamos justo tras el input
      referenciaInsercion = input;
    }

    // Revisa si ya existe un feedback previo
    let feedback = referenciaInsercion.nextElementSibling;
    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
      feedback = document.createElement("div");
      feedback.classList.add("invalid-feedback");

      feedback.style.color = "#d9534f";
      feedback.style.fontSize = "0.9em";
      feedback.style.marginTop = "0.25em";
      referenciaInsercion.insertAdjacentElement("afterend", feedback);
    }

    feedback.innerHTML = mensajeHtml;
  }

  // limpiar errores (sin cambios)

  function limpiarError(input) {
    input.classList.remove("is-invalid");
    const next = input.nextElementSibling;
    const feedback =
      next && next.classList.contains("invalid-feedback")
        ? next
        : next &&
          next.tagName === "BUTTON" &&
          next.nextElementSibling &&
          next.nextElementSibling.classList.contains("invalid-feedback")
          ? next.nextElementSibling
          : null;
    if (feedback) feedback.remove();
  }

  // Validaciones
  function validarNombreApellido(input, campoNombre) {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.value.trim())) {
      mostrarError(input, `El campo ${campoNombre} solo permite letras.`);
      return false;
    }
    limpiarError(input);
    return true;
  }
  function validarIdentificacion(input) {
    if (!/^\d+$/.test(input.value.trim())) {
      mostrarError(input, "Solo se permiten números.");
      return false;
    }
    limpiarError(input);
    return true;
  }
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
    const val = input.value;
    const checks = [
      { test: /.{8,20}/, label: "8–20 caracteres" },
      { test: /[A-Z]/, label: "1 mayúscula" },
      { test: /[a-z]/, label: "1 minúscula" },
      { test: /\d/, label: "1 número" },
      { test: /[#!?¡."$%&()\-_:;,@]/, label: "1 símbolo especial ej. #!”?¡" },
    ];
    const faltantes = checks
      .filter((c) => !c.test.test(val))
      .map(
        (c) => `<li style="margin-left:1em; list-style:none;">✖ ${c.label}</li>`
      )
      .join("");

    if (faltantes) {
      mostrarError(
        input,
        `
        <p style="margin:0 0 .5em 0;">La contraseña debe incluir:</p>
        <ul style="padding-left:0; margin:0;">
          ${faltantes}
        </ul>
      `
      );
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

  // Toggle contraseña
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

  // Cargar géneros
  function cargarGeneros() {
    const generoSelect = document.getElementById("genero");
    if (!generoSelect) return;
    fetch("./includes/obtenergeneros.php")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((genero) => {
          const option = document.createElement("option");
          option.value = genero.id_genero;
          option.textContent = genero.nombre_genero;
          generoSelect.appendChild(option);
        });
      })
      .catch(console.error);
  }

  // Validar todo el formulario
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
    valido = validarNombreApellido(apellido, "apellidos") && valido;
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

  // Enviar registro al servidor
  function enviarRegistro() {
    const form = document.getElementById("registroForm");
    const formData = new FormData(form);

    fetch("./includes/registro.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // Redirigir a la página principal
          window.location.href = data.redirect;
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al registrar.");
      });
  }

  // Arranca
  checkForm();
})();
