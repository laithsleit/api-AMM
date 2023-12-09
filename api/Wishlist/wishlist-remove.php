<?php

include "../include.php";
include "Wishlist.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
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
if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid data."]);
    exit;
}

// Remove product from the wishlist
$result = $wishlist->removeFromWishlist($mysqli, $userID, $productID);

// Echo the result in JSON format
echo json_encode($result);
?>
