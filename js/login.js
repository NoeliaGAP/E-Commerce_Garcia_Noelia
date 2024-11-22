const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    // Evitar el comportamiento por defecto del formulario
    e.preventDefault();

    // Crear un objeto FormData para obtener los valores del formulario
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    // Verificar si las credenciales son correctas
    if (email === "mail@example.com" && password === "Password") {
        // Guardar la sesión y redirigir al usuario a la página principal
        localStorage.setItem("session", email);
        window.location.href = "./home.html";
    } else {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        Toastify({
            text: "Credenciales incorrectas",
            className: "info",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }
        }).showToast();
    }
});
