<?php
session_start();

// Check if user is logged in (session or cookie)
if (!isset($_SESSION['field1']) && !isset($_COOKIE['user_email'])) {
    // Redirect to login if not logged in
    header("Location: index.html");
    exit();
}

// Retrieve user data from session or cookie
$email = isset($_SESSION['field1']) ? $_SESSION['field1'] : $_COOKIE['user_email'];

// Display user data
echo "<h1>Welcome, " . htmlspecialchars($email) . "</h1>";

// Example GET request to an API
$apiUrl = "https://api.example.com/get-data?email=" . urlencode($email);
$response = file_get_contents($apiUrl);

// Handle the response
if ($response !== false) {
    $data = json_decode($response, true);
    echo "<pre>" . print_r($data, true) . "</pre>";
} else {
    echo "Error fetching data from API.";
}
?>
