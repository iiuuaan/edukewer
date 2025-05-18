<?php
include "session-check.php";
if ($_SESSION['role'] !== 'user') {
    header("Location: admin-dashboard.php");
    exit;
}
?>

<h1>Selamat datang, <?= $_SESSION['username'] ?> (User)</h1>
<a href="logout.php">Logout</a>
