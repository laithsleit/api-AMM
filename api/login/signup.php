<?php
/**
 * File: signup.php
 * 
 * Purpose:
 * This file handles user signup requests and communicates with the User class to create a new user account.
 * 
 * Usage:
 * Use POST method to sign up a new user. Send user details in JSON format in the request body.
 * Example request: POST http://example.com/signup
 * Request body: {"Username":"newuser","Password":"password123","Email":"newuser@example.com"}
 * Example response: {"success":true,"message":"Signup successful."}
 */

include "../include.php";
include "User.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);

    if (!$inputData || !isset($inputData['Username']) || !isset($inputData['Password']) || !isset($inputData['Email'])) {
        echo json_encode(array("success" => false, "message" => "Invalid request data."));
        exit();
    }

    $username = trim($inputData['Username']);
    $password = $inputData['Password'];
    $email = trim($inputData['Email']);

    // Validate Username
    if (!preg_match('/^(?=.*[A-Za-z]).{6,}$/', $username)) {
        echo json_encode(array("success" => false, "message" => "Username must be at least 6 characters long and include at least one letter."));
        exit();
    }

    // Validate Password
    if (!preg_match('/^(?=.*[A-Za-z]).{6,}$/', $password)) {
        echo json_encode(array("success" => false, "message" => "Password must be at least 6 characters long and include at least one letter."));
        exit();
    }

    // Validate Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array("success" => false, "message" => "Invalid email format."));
        exit();
    }

    $user = new User($mysqli);
    $result = $user->signup($username, $password, $email);
    echo json_encode($result);
} else {
    echo json_encode(array("success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an unsupported request method."));
}

$mysqli->close();
?>
