document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulasi login (Bisa diganti dengan backend)
        if (username === "admin" && password === "1234") {
            localStorage.setItem("role", "admin");
            window.location.href = "admin-dashboard.html"; // Redirect ke Admin Dashboard
        } else if (username !== "" && password === "1234") { 
            localStorage.setItem("role", "user");
            window.location.href = "dashboard.html"; // Redirect ke User Dashboard
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    });

    // Cek jika sudah login, langsung redirect
    if (localStorage.getItem("role") === "admin") {
        window.location.href = "admin-dashboard.html";
    } else if (localStorage.getItem("role") === "user") {
        window.location.href = "dashboard.html";
    }
});
