<?php
include "session-check.php";
if ($_SESSION['role'] !== 'admin') {
    header("Location: dashboard.php");
    exit;
}
?>

<h1>Selamat datang, <?= $_SESSION['username'] ?> (Admin)</h1>
<a href="PHP/logout.php">Logout</a>
