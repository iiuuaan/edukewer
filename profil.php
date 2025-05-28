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
$sql = "SELECT nama, username, email, role FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "User tidak ditemukan"]);
}
$conn->close();
