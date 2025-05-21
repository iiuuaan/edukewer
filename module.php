<?php
// module.php
// Koneksi ke database MariaDB
$servername = "localhost";
$username = "root";  // sesuaikan username db
$password = "";      // sesuaikan password db
$dbname = "edukewer";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ambil course_id dari parameter URL
$course_id = isset($_GET['course_id']) ? intval($_GET['course_id']) : 0;
if ($course_id <= 0) {
    die("Invalid course ID.");
}

// Ambil info course
$sqlCourse = "SELECT * FROM courses WHERE id = $course_id";
$resultCourse = $conn->query($sqlCourse);
if ($resultCourse->num_rows == 0) {
    die("Course not found.");
}
$course = $resultCourse->fetch_assoc();

// Ambil semua modul dari course ini
$sqlModules = "SELECT * FROM course_modules WHERE course_id = $course_id ORDER BY order_no ASC";
$resultModules = $conn->query($sqlModules);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Modules of <?php echo htmlspecialchars($course['title']); ?></title>
    <link rel="stylesheet" href="assets/css/module.css" />
</head>
<body>
<header>
    <h1>Course: <?php echo htmlspecialchars($course['title']); ?></h1>
    <nav>
        <a href="index.html">Home</a>
        <a href="dashboard.html">Dashboard</a>
    </nav>
</header>

<div class="module-container">
    <h2>Modules</h2>
    <?php if ($resultModules->num_rows > 0): ?>
        <ul>
            <?php while($module = $resultModules->fetch_assoc()): ?>
            <li>
                <h3><?php echo htmlspecialchars($module['title']); ?></h3>
                <p><?php echo nl2br(htmlspecialchars($module['content'])); ?></p>
                <!-- Jika ada video materi, bisa ditampilkan di sini -->
                <!-- Contoh (asumsikan ada kolom video_url di db): -->
                <?php if (!empty($module['video_url'])): ?>
                <div class="video-container">
                    <video controls>
                        <source src="<?php echo htmlspecialchars($module['video_url']); ?>" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <?php endif; ?>

                <a href="quiz.php?module_id=<?php echo $module['id']; ?>" class="quiz-link">Take Quiz</a>
                <a href="forum.php?module_id=<?php echo $module['id']; ?>" class="forum-link">Go to Forum</a>
                <button class="enroll-btn" data-module-id="<?php echo $module['id']; ?>">Enroll</button>
            </li>
            <?php endwhile; ?>
        </ul>
    <?php else: ?>
        <p>No modules found for this course.</p>
    <?php endif; ?>
</div>

<script src="assets/js/module.js"></script>
</body>
</html>

<?php $conn->close(); ?>
