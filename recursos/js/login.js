document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Alternar visibilidad de la contraseña
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁️";
        }
    });

    // Manejo del formulario de login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = passwordInput.value;

        if (email.trim() === "" || password.trim() === "") {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Simulación de autenticación
        if (email === "admin@confaclass.com" && password === "admin123") {
            alert("Inicio de sesión exitoso");
            window.location.href = "dashboard.html"; // Redirigir al panel
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
});
