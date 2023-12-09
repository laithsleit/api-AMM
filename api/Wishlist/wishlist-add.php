<?php

include "../include.php";
include "Wishlist.php";

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
$userID = $inputData['UserID'] ?? null;
$productID = $inputData['ProductID'] ?? null;

// Create an instance of the Wishlist class
$wishlist = new Wishlist();

// Check for missing or invalid data
if ($userID === null || $productID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
    exit;
}

// Add product to the wishlist
$result = $wishlist->addToWishlist($mysqli, $userID, $productID);

// Echo the result in JSON format
echo json_encode($result);
?>
