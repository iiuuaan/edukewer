document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

        // Kirim data ke PHP
        fetch("PHP/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Simpan role ke localStorage
                localStorage.setItem("role", data.role);

                if (data.role === "admin") {
                    window.location.href = "HTML/admin-dashboard.html";
                } else {
                    window.location.href = "HTML/dashboard.html";
                }
            } else {
                errorMessage.style.display = "block";
                errorMessage.textContent = data.message || "Invalid credentials!";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage.style.display = "block";
            errorMessage.textContent = "Terjadi kesalahan server.";
        });
    });

    // Auto-redirect jika sudah login
    const role = localStorage.getItem("role");
    if (role === "admin") {
        window.location.href = "HTML/admin-dashboard.html";
    } else if (role === "user") {
        window.location.href = "HTML/dashboard.html";
    }
});

if (data.success) {
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username); // Tambahan ini

    if (data.role === "admin") {
        window.location.href = "HTML/admin-dashboard.html";
    } else {
        window.location.href = "HTML/dashboard.html";
    }
}

