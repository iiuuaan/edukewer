
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("role");
    window.location.href = "index.html"; // Redirect ke index setelah logout
  });