// forum.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forum-form');
    const input = document.getElementById('message-input');
    const messagesDiv = document.getElementById('messages');

    // Bisa ditambah AJAX untuk submit tanpa reload (optional)
    form.addEventListener('submit', (e) => {
        // Default submit, reload page, jadi AJAX optional
        // Kalau mau AJAX, bisa diimplementasikan di sini
    });

    // Scroll ke bawah saat load halaman
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
