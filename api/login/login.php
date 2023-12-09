<?php

/**
 * File: login.php
 * 
 * Purpose:
 * This file handles user login requests and communicates with the User class to verify user credentials.
 * 
 * Usage:
 * Use POST method to log in a user. Send login details in JSON format in the request body.
 * Example request: POST http://example.com/login
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

    // Assuming you have the following data from the API request
    $username = $inputData['Username'];
    $password = $inputData['Password'];

    // Create a new User instance
    $user = new User($mysqli);

    // Login the user
    $result = $user->login($username, $password);

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Unsupported request method
    echo json_encode(array("success" => false, "message" => $_SERVER['REQUEST_METHOD']." Is Unsupported request method."));
}

// Close the database connection
$mysqli->close();

?>