document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    fetch("../../PHP/register.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`
    })
    .then(res => res.json())
    .then(data => {
        const msg = document.getElementById("register-message");
        msg.style.display = "block";

        if (data.success) {
            msg.style.color = "green";
            msg.textContent = "Registrasi berhasil! Redirect ke login...";
            setTimeout(() => {
                window.location.href = "HTML/login.html";
            }, 1500);
        } else {
            msg.style.color = "red";
            msg.textContent = data.message || "Registrasi gagal.";
        }
    });
});
