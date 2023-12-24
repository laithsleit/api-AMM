<?php

/**
 * File: login.php
 * 
 * Purpose:
 * This file handles user login requests and communicates with the User class to verify user credentials.
 * 
 * Usage:
 * Use POST method to log in a user. Send login details in JSON format in the request body.
 * Example request: POST 
 * Request body: {"Username":"existinguser","Password":"password123"}
 * Example response: {"success":true,"message":"Login successful."}
 */

include "../include.php";
include "User.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Check if data is present in the request
    if (!$inputData || !isset($inputData['Username']) || !isset($inputData['Password'])) {
        echo json_encode(array("success" => false, "message" => "Invalid request data."));
        exit();
    }

    // Sanitize and validate inputs
    $username = trim($inputData['Username']);
    $password = $inputData['Password'];

    // Username Validation: at least 6 characters and include at least one uppercase letter.
    if (!preg_match('/^(?=.*[A-Za-z]).{6,}$/', $username)) {
        echo json_encode(array("success" => false, "message" => "Username must be at least 6 characters long and include at least one letter."));
        exit();
    }

    // Password Validation: at least 6 characters, at least one uppercase letter, and numbers.
    if (!preg_match('/^(?=.*[A-Za-z]).{6,}$/', $password)) {
        echo json_encode(array("success" => false, "message" => "Password must be at least 6 characters long and include at least one letter."));
        exit();
    }

    // Create a new User instance
    $user = new User($mysqli);

    // Login the user
    $result = $user->login($username, $password);

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Unsupported request method
    echo json_encode(array("success" => false, "message" => $_SERVER['REQUEST_METHOD']." is an unsupported request method."));
}

// Close the database connection
$mysqli->close();

?>
