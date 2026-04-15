<?php
// User Login API
header('Content-Type: application/json');
session_start();
require_once __DIR__ . '/../includes/db_config.php';

$response = ['success' => false, 'message' => '', 'redirect' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validation
    if (empty($email) || empty($password)) {
        $response['message'] = 'Email and password are required.';
        echo json_encode($response);
        exit();
    }

    // Check user
    $result = $conn->query("SELECT * FROM users WHERE email = '$email'");

    if ($result->num_rows === 0) {
        $response['message'] = 'Invalid email or password.';
        logActivity(null, null, "Failed login attempt: $email");
        echo json_encode($response);
        exit();
    }

    $user = $result->fetch_assoc();
    $hashedPassword = hash('sha256', $password);

    if ($user['password'] !== $hashedPassword) {
        $response['message'] = 'Invalid email or password.';
        logActivity(null, null, "Failed login attempt: $email");
        echo json_encode($response);
        exit();
    }

    // Login successful
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['name'];

    $response['success'] = true;
    $response['message'] = 'Login successful!';
    $response['redirect'] = '/FindMyScheme/dashboard.php';
    
    logActivity($user['id'], $user['id'], "User logged in");
}

echo json_encode($response);
?>
