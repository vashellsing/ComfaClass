(() => {
    const formularioLogin = document.querySelector("#formLogin");
  
    if (formularioLogin) {
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const mensajeError = document.getElementById("mensajeError");
  
      formularioLogin.addEventListener("submit", (evento) => {
        evento.preventDefault();
  
        const email = emailInput.value.trim();
        const password = passwordInput.value;
  
        // Validación simple
        if (!email || !password) {
          mensajeError.textContent = "Debes llenar todos los campos.";
          mensajeError.style.display = "block";
          return;
        }
  
        if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
          mensajeError.textContent = "Solo se aceptan correos @gmail.com o @hotmail.com.";
          mensajeError.style.display = "block";
          return;
        }
  
        mensajeError.style.display = "none";
  
        // Envío de datos al backend
        fetch("./includes/iniciarSesion.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert(data.message);
            if (typeof window.navegarA === "function") {
              window.navegarA(data.redirect);
            } else {
              console.error("La función navegarA no está definida.");
            }
          } else {
            mensajeError.textContent = data.message;
            mensajeError.style.display = "block";
          }
        })
        .catch(error => {
          console.error("Error:", error);
          mensajeError.textContent = "Error de conexión con el servidor.";
          mensajeError.style.display = "block";
        });
      });
    } else {
      console.error("No se encontró el formulario con id 'formLogin'.");
    }

    
  })();
  