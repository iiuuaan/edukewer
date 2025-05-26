
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("role");
    window.location.href = "HTML/index.html"; // Redirect ke index setelah logout
  });

  if (localStorage.getItem("role") !== "user") {
    window.location.href = "HTML/login.html";
}