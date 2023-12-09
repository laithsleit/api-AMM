<?php

include "../include.php";
include "User.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] ." is Invalid request method."]);
    exit;
}

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Create an instance of the User class
$user = new User($mysqli);

// Check for missing or invalid data
if (empty($inputData)) {
    echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
    exit;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the search input is provided
    if (isset($inputData['searchInput'])) {
        $result = $user->searchUsers($inputData['searchInput']);
    } else {
        $result = ["success" => false, "message" => "Invalid search input."];
    }

    // Echo the result in JSON format
    echo json_encode($result);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request (if needed)
    echo json_encode(["success" => false, "message" => "Invalid request method for this endpoint."]);
} else {
    // Handle other request methods (if needed)
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Close the database connection
$mysqli->close();

?>
