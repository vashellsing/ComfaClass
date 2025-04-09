(() => {
    const formRecuperar = document.querySelector("#formRecuperar");
  
    if (!formRecuperar) {
      console.error("No se encontró el formulario con id 'formRecuperar'.");
      return;
    }
  
    const emailInput = document.getElementById("email");
    const mensajeError = document.getElementById("mensajeError");
    const mensajeExito = document.getElementById("mensajeExito");
  
    formRecuperar.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = emailInput.value.trim();
  
      // Validar que se ingrese un email
      if (!email) {
        mensajeError.textContent = "Debes ingresar tu correo electrónico.";
        mensajeError.style.display = "block";
        return;
      }
  
      // Validación simple para permitir solo @gmail.com o @hotmail.com
      if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
        mensajeError.textContent =
          "El correo ingresado no está permitido. Solo se aceptan @gmail.com o @hotmail.com.";
        mensajeError.style.display = "block";
        return;
      }
  
      mensajeError.style.display = "none";
  
      // Enviar la solicitud de recuperación al backend
      fetch("./includes/recuperarContrasena.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Mostrar mensaje de éxito
            mensajeExito.textContent = data.message || "Se han enviado las instrucciones a tu correo.";
            mensajeExito.style.display = "block";
          } else {
            // Mostrar mensaje de error del backend
            mensajeError.textContent = data.message || "Hubo un error al enviar las instrucciones.";
            mensajeError.style.display = "block";
          }
        })
        .catch(error => {
          console.error("Error:", error);
          mensajeError.textContent = "Error de conexión con el servidor.";
          mensajeError.style.display = "block";
        });
    });
  })();
  