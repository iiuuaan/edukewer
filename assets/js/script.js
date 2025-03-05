document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");
    const logoutBtn = document.querySelector("#logout");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Login successful!");
            window.location.href = "dashboard.html";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(event) {
            event.preventDefault();
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    }
});
