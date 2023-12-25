<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";
include "Product.php";

// CORS headers


// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Create an instance of the Product class
$product = new Product($mysqli);

// Check for missing or invalid data
if (empty($inputData) || !isset($inputData['searchProducts'])) {
    echo json_encode(["success" => false, "message" => "Missing or invalid search data."]);
    exit;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check the search criteria and perform the search
    
    $result = $product->searchProducts($inputData['searchProducts']);

    // Echo the result in JSON format
    echo json_encode($result);
} else {
    // Handle GET request (if needed)
    echo json_encode(["success" => false, "message" => "Invalid request method for this endpoint."]);
} 


// Close the database connection
$mysqli->close();
?>
