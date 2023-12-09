<?php

include "../include.php";
include "Review.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] ." is Invalid request method."]);
    exit;
}

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
$userID = $inputData['userID'];
$productID = $inputData['productID'];
$reviewText = $inputData['reviewText'];
$rating = $inputData['rating'];

// Create a new instance of the Review class
$reviewObj = new Review($mysqli);

// Insert the review
$result = $reviewObj->insertReview($userID, $productID, $reviewText, $rating);

// Return the result as JSON
echo json_encode($result);

?>
