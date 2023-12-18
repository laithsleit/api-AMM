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
$userID = $_GET['UserID'] ?? null;

// Create an instance of the Cart class
$cart = new Cart($mysqli);

// Check for missing or invalid data
if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid user ID."]);
    exit;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $inputData['action'] ?? null;

    if ($action === 'delete') {
        try {
            $productID = $inputData['ProductID'] ?? null;
            $cart->deleteCartItem($userID, $productID);

            echo json_encode(["success" => true, "message" => "Item deleted successfully."]);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
        }
    } else {
        try {
            $productID = $inputData['ProductID'] ?? null;
            $quantity = $inputData['Quantity'] ?? null;
            $subOrSum = $inputData['SubOrSum'] ?? null;

            if ($subOrSum == 1) {
                $result = $cart->addToCart($userID, $productID, $quantity);
            } elseif ($subOrSum == 0) {
                $result = $cart->subtractFromCart($userID, $productID);
            } else {
                throw new Exception("Invalid SubOrSum value.");
            }

            echo json_encode($result);
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $result = $cart->getProductsInCart($userID);
        echo json_encode($result);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an invalid request method."]);
}

$mysqli->close();
?>
