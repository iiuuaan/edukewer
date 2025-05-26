<?php
include "session-check.php";
if ($_SESSION['role'] !== 'user') {
    header("Location: admin-dashboard.php");
    exit;
}
?>

<h1>Selamat datang, <?= $_SESSION['username'] ?> (User)</h1>
<a href="PHP/logout.php">Logout</a>
