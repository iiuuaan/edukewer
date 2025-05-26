<?php
session_start();

// Koneksi database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edukewer";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Pastikan user sudah login dan ada course_id
if (!isset($_SESSION['user_id'])) {
    header("Location: index.html"); // atau halaman login
    exit();
}

$course_id = isset($_GET['course_id']) ? intval($_GET['course_id']) : 0;
if ($course_id <= 0) {
    die("Invalid course ID.");
}

$user_id = $_SESSION['user_id'];

// Handle POST request untuk kirim pesan baru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = trim($_POST['message'] ?? '');
    if ($message !== '') {
        $stmt = $conn->prepare("INSERT INTO forum_messages (course_id, user_id, message) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $course_id, $user_id, $message);
        $stmt->execute();
        $stmt->close();
        header("Location: forum.php?course_id=$course_id");
        exit();
    }
}

// Ambil pesan untuk course ini, join users untuk nama
$sql = "SELECT fm.message, fm.created_at, u.username, u.role 
        FROM forum_messages fm 
        JOIN users u ON fm.user_id = u.id 
        WHERE fm.course_id = ? 
        ORDER BY fm.created_at ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $course_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Forum Discussion</title>
<link rel="stylesheet" href="assets/css/forum.css" />
</head>
<body>
<header>
    <h1>Forum Discussion</h1>
    <nav>
        <a href="HTML/dashboard.html">Dashboard</a>
        <a href="HTML/index.html" id="logout">Logout</a>
    </nav>
</header>

<section class="forum">
    <h2>Course Discussion</h2>
    <div class="messages" id="messages">
        <?php if (count($messages) > 0): ?>
            <?php foreach ($messages as $msg): ?>
                <div class="message">
                    <strong><?php echo htmlspecialchars($msg['username']); ?><?php echo ($msg['role'] === 'admin' || $msg['role'] === 'instructor') ? " (Instructor)" : ""; ?>:</strong> 
                    <?php echo nl2br(htmlspecialchars($msg['message'])); ?>
                    <div class="timestamp"><?php echo $msg['created_at']; ?></div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No messages yet. Start the discussion!</p>
        <?php endif; ?>
    </div>

    <form id="forum-form" method="POST" action="forum.php?course_id=<?php echo $course_id; ?>">
        <input type="text" id="message-input" name="message" placeholder="Type your message..." required autocomplete="off" />
        <button type="submit">Send</button>
    </form>
</section>

<script src="assets/js/forum.js"></script>
</body>
</html>
