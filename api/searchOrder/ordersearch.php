<?php
include "OrderSearch.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
$startDate = $inputData['startDate'] ?? null;
$endDate = $inputData['endDate'] ?? null;

// Create an instance of the OrderSearch class
$orderSearch = new OrderSearch();

// Check for missing or invalid data
if ($startDate === null || $endDate === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
    exit;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Search orders within the date range
    $result = $orderSearch->searchOrdersByDateRange($mysqli, $startDate, $endDate);

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Invalid request method
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

// Close the database connection
$mysqli->close();
