<?php
session_start();
session_unset();     // Kosongkan semua variabel sesi
session_destroy();   // Hancurkan sesi

// Kirim respons JSON agar bisa dibaca oleh fetch() JavaScript
header('Content-Type: application/json');
echo json_encode([
    "success" => true,
    "message" => "Logout berhasil"
]);
exit;
