<?php

include "../include.php";
include "Cart.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the JSON data from the request body
$inputData = json_decode(file_get_contents("php://input"), true);

// Assuming you have the following data from the API request
$userID = $inputData['UserID'] ?? null;

// Create an instance of the Cart class
$cart = new Cart($mysqli);

// Check for missing or invalid data
if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid user ID."]);
    exit;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST requests for adding/subtracting products from the cart
    try {
        $productID = $inputData['ProductID'] ?? null;
        $quantity = $inputData['Quantity'] ?? null;
        $subOrSum = $inputData['SubOrSum'] ?? null;

        // Add or subtract based on the SubOrSum value
        if ($subOrSum == 1) {
            $result = $cart->addToCart($userID, $productID, $quantity);
        } elseif ($subOrSum == 0) {
            $result = $cart->subtractFromCart($userID, $productID);
        } else {
            throw new Exception("Invalid SubOrSum value.");
        }

        // Echo the result in JSON format
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET requests to retrieve products in the cart
    try {
        $result = $cart->getProductsInCart($userID);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    // Handle other request methods (if needed)
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an invalid request method."]);
}

// Close the database connection
$mysqli->close();
?>
