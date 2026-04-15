<?php
// User Registration API
header('Content-Type: application/json');
require_once __DIR__ . '/../includes/db_config.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $age = isset($_POST['age']) ? (int)$_POST['age'] : null;
    $state = sanitize($_POST['state'] ?? '');

    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        $response['message'] = 'Name, email, and password are required.';
        echo json_encode($response);
        exit();
    }

    if (strlen($password) < 6) {
        $response['message'] = 'Password must be at least 6 characters.';
        echo json_encode($response);
        exit();
    }

    // Check if email already exists
    $existingUser = $conn->query("SELECT id FROM users WHERE email = '$email'");
    if ($existingUser->num_rows > 0) {
        $response['message'] = 'This email is already registered.';
        echo json_encode($response);
        exit();
    }

    // Hash password
    $hashedPassword = hash('sha256', $password);

    // Insert user
    $sql = "INSERT INTO users (name, email, password, age, state) 
            VALUES ('$name', '$email', '$hashedPassword', $age, '$state')";

    if ($conn->query($sql)) {
        $response['success'] = true;
        $response['message'] = 'Registration successful! Please login.';
        logActivity('user_registered', $conn->insert_id, "User registered: $email");
    } else {
        $response['message'] = 'Registration failed. Please try again.';
        logActivity('registration_failed', null, "Failed registration attempt: $email");
    }
}

echo json_encode($response);
?>
