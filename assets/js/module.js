// module.js

document.addEventListener('DOMContentLoaded', () => {
  // Contoh tombol enroll
  const enrollButtons = document.querySelectorAll('.enroll-btn');
  enrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleId = btn.dataset.moduleId;
      alert(`You enrolled in module ID: ${moduleId}`);
      // Bisa ditambahkan AJAX request untuk daftar di backend
    });
  });

  // Contoh navigasi sederhana (jika diperlukan)
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Misal prevent default untuk AJAX navigation
      // e.preventDefault();
      // Load konten dinamis lewat AJAX jika mau
    });
  });
});
