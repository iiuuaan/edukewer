document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    const userInfo = document.getElementById("user-info");
    const userRoleLabel = document.getElementById("user-role-label");
    const logoutBtn = document.getElementById("logout-btn");

    // Jika sudah login, tampilkan info user dan logout button
    if (role && userInfo && userRoleLabel) {
        userInfo.style.display = "block";
        userRoleLabel.textContent = `Logged in as: ${role}`;
    }

    // Fungsi logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("role");

            fetch("PHP/logout.php", {
                method: "POST"
            })
            .then(() => {
                window.location.href = "HTML/login.html";
            })
            .catch(err => {
                console.error("Logout error:", err);
                alert("Gagal logout.");
            });
        });
    }
});
