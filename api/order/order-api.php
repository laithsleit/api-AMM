<?php

include "../include.php";
include "Order.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Create an instance of the Order class
$order = new Order($mysqli);

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $order->getOrdersWithUsername();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming you have the following data from the API request
    $userID = $inputData['UserID'] ?? null;

    // Check for missing or invalid data
    if ($userID === null) {
        echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
        exit;
    }

    $result = $order->getOrdersWithUsername($userID);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method for this endpoint."]);
    exit;
}

// Echo the result in JSON format
echo json_encode($result);

// Close the database connection
$mysqli->close();

?>
