<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['username'])) {
    echo json_encode(["success" => false, "message" => "Belum login"]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "edukewer");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Koneksi database gagal"]);
    exit;
}

$username = $_SESSION['username'];
$nama = $_POST['nama'] ?? '';
$email = $_POST['email'] ?? '';

if ($nama === '' || $email === '') {
    echo json_encode(["success" => false, "message" => "Nama dan email tidak boleh kosong"]);
    exit;
}

$sql = "UPDATE users SET nama = ?, email = ? WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nama, $email, $username);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal memperbarui data"]);
}
$conn->close();
