(() => {
    
    // Selecciona el formulario
    const formularioLogin = document.querySelector("#formLogin");

    if (formularioLogin) {
        // Si no existe el contenedor de error, lo creamos y lo insertamos debajo del campo de email
        let mensajeError = document.querySelector("#mensajeError");
        if (!mensajeError) {
            mensajeError = document.createElement("small");
            mensajeError.id = "mensajeError";
            mensajeError.classList.add("form-text", "text-danger");
            mensajeError.style.display = "none";
            const emailInput = document.getElementById("email");
            emailInput.parentNode.insertBefore(mensajeError, emailInput.nextSibling);
        }

        formularioLogin.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evita el envío inmediato

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // Verifica que el correo termine en "@gmail.com" o "@hotmail.com"
            if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
                mensajeError.textContent = "El correo ingresado no esta permitido. Solo se aceptan @gmail.com o @hotmail.com.";
                mensajeError.style.display = "block";
                return;
            } else {
                mensajeError.textContent = "";
                mensajeError.style.display = "none";
            }

            console.log("Correo permitido:", email);

            // Envío de las credenciales mediante fetch a login.php
            fetch("./includes/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message); // Opcional: Muestra el mensaje de éxito
                    // Redirige a la URL indicada por el backend
                    if (typeof window.navegarA === "function") {
                        window.navegarA(data.redirect);
                    } else {
                        console.error("La función navegarA no está definida.");
                    }
                } else {
                    alert(data.message); // Mostrar mensaje de error
                }
            })
            .catch(error => console.error("Error:", error));
        });
    } else {
        console.error("No se encontró el formulario con id 'formLogin'.");
    }

})();
