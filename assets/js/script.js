document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");
    const logoutBtn = document.querySelector("#logout");
    const enrollButtons = document.querySelectorAll(".enroll-btn");
    const quizForm = document.querySelector("#quiz-form");

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

    if (enrollButtons) {
        enrollButtons.forEach(button => {
            button.addEventListener("click", function() {
                alert("You have enrolled in " + this.dataset.course);
                this.innerText = "Enrolled";
                this.disabled = true;
            });
        });
    }

    if (quizForm) {
        quizForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let score = 0;
            const answers = {
                q1: "b",
                q2: "b"
            };

            const formData = new FormData(quizForm);
            for (const [key, value] of formData.entries()) {
                if (answers[key] === value) {
                    score++;
                }
            }

            alert("Your score: " + score + "/2");
        });
    }
});
