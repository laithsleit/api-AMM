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


if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] ." is Invalid request method."]);
    exit;
}
// $inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
// $productID = $inputData['productID'];

// Create a new instance of the Review class
$reviewObj = new Review($mysqli);

// Get reviews with user details
$result = $reviewObj->getReviewsWithUserDetails();

// Return the result as JSON
echo json_encode($result);

?>
