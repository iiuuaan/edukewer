document.addEventListener("DOMContentLoaded", function () {
  const courseForm = document.getElementById("course-form");
  const courseList = document.getElementById("course-list");
  const userList = document.getElementById("user-list");

  // Simpan kursus dalam array sementara
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  let users = [
    { id: 1, name: "Alice", role: "Student" },
    { id: 2, name: "Bob", role: "Instructor" },
  ];

  // Render daftar kursus
  function renderCourses() {
    courseList.innerHTML = "";
    courses.forEach((course, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <strong>${course.title}</strong>: ${course.description}
                <button onclick="editCourse(${index})">Edit</button>
                <button onclick="deleteCourse(${index})">Delete</button>
            `;
      courseList.appendChild(li);
    });
  }

  // Tambah Kursus
  courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("course-title").value;
    const description = document.getElementById("course-description").value;

    courses.push({ title, description });
    localStorage.setItem("courses", JSON.stringify(courses));

    renderCourses();
    courseForm.reset();
  });

  // Hapus Kursus
  window.deleteCourse = function (index) {
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    renderCourses();
  };

  // Edit Kursus
  window.editCourse = function (index) {
    const newTitle = prompt("Enter new course title:", courses[index].title);
    const newDescription = prompt(
      "Enter new course description:",
      courses[index].description
    );

    if (newTitle && newDescription) {
      courses[index] = { title: newTitle, description: newDescription };
      localStorage.setItem("courses", JSON.stringify(courses));
      renderCourses();
    }
  };

  // Render daftar pengguna
  function renderUsers() {
    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <strong>${user.name}</strong> - ${user.role}
                <button onclick="deleteUser(${user.id})">Remove</button>
            `;
      userList.appendChild(li);
    });
  }

  // Hapus Pengguna
  window.deleteUser = function (id) {
    users = users.filter((user) => user.id !== id);
    renderUsers();
  };

  // Render awal
  renderCourses();
  renderUsers();

  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("role");
    window.location.href = "index.html";
  });
});
