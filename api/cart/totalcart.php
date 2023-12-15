<?php

include "../include.php";
include "cart.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
$userID = $_GET['UserID'] ?? null;

// Create an instance of the Cart class
$cart = new Cart($mysqli);

// Check for missing or invalid data
if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid user ID."]);
    exit;
}

// Handle GET requests to retrieve the total cart price
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $result = $cart->getTotalCartPrice($userID);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an invalid request method."]);
}

// Close the database connection
$mysqli->close();

?>
