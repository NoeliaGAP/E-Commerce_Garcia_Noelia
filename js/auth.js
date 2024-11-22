const session = localStorage.getItem("session");

// Redirigir a home si ya hay una sesión activa y estamos en la página de login
if (session && location.pathname === "/login.html") {
    window.location.href = "./home.html";
}

// Redirigir a login si no hay sesión activa y estamos en la página del carrito
if (!session && location.pathname === "/cart.html") {
    window.location.href = "./login.html";
}
