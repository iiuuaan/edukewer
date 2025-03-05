document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah form melakukan submit default
            alert("Login successful!");
            window.location.href = "dashboard.html";
        });
    }
});
