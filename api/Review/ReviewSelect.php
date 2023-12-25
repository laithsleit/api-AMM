<?php

include "../include.php";
include "Review.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    exit();
}

// Create a new instance of the Review class
$reviewObj = new Review($mysqli);

// Determine the request method and handle accordingly
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get reviews with user details
        $result = $reviewObj->getAllReviews();
        break;

    case 'POST':
        // Decode the incoming JSON data
        $inputData = json_decode(file_get_contents("php://input"), true);
        if (!isset($inputData['productID'])) {
            echo json_encode(["success" => false, "message" => "Product ID is required for POST request."]);
            exit;
        }
        $productID = $inputData['productID'];

        // Get reviews with user details for a specific product
        $result = $reviewObj->getReviewsByProductID($productID);
        break;

    default:
        // Handle any unsupported methods
        $result = ["success" => false, "message" => $_SERVER['REQUEST_METHOD'] ." is an invalid request method."];
        break;
}

// Return the result as JSON
echo json_encode($result);

?>
