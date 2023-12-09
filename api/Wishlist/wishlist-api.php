<?php

include('../include.php');
include('wishlist.php');

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Instantiate the Wishlist class and pass the database connection
$wishlist = new Wishlist();

// Get the input data
$inputData = json_decode(file_get_contents("php://input"), true);

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming you get user and product information from the input data
    $userId = isset($inputData['userId']) ? $inputData['userId'] : null;
    $productId = isset($inputData['productId']) ? $inputData['productId'] : null;

    // Validate user ID
    if ($userId === null) {
        echo json_encode(["success" => false, "message" => "User ID is required"]);
        exit;
    }

    // Call the addToWishlist method and pass the database connection
    $result = $wishlist->addToWishlist($mysqli, $userId, $productId);

    // Output the result as JSON
    echo json_encode($result);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Assuming you get user information from the input data
    $userId = isset($inputData['userId']) ? $inputData['userId'] : null;

    // Validate user ID
    if ($userId === null) {
        echo json_encode(["success" => false, "message" => "User ID is required"]);
        exit;
    }

    // Call the getWishlist method and pass the database connection
    $result = $wishlist->getWishlist($mysqli, $userId);

    // Output the result as JSON
    echo json_encode($result);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Assuming you get user and product information from the input data
    $userId = isset($inputData['userId']) ? $inputData['userId'] : null;
    $productId = isset($inputData['productId']) ? $inputData['productId'] : null;

    // Validate user ID
    if ($userId === null) {
        echo json_encode(["success" => false, "message" => "User ID is required"]);
        exit;
    }

    // Call the removeFromWishlist method and pass the database connection
    $result = $wishlist->removeFromWishlist($mysqli, $userId, $productId);

    // Output the result as JSON
    echo json_encode($result);
} else {
    // Unsupported request method
    echo json_encode(["success" => false, "message" => "Unsupported request method"]);
}

?>
