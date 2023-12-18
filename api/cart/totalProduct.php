<?php

include "../include.php";
include "Cart.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$userID = $_GET['UserID'] ?? null;
$cart = new Cart($mysqli);

if ($userID === null) {
    echo json_encode(["success" => false, "message" => "Missing or invalid user ID."]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Additional case to handle total product count request
    if (isset($_GET['action']) && $_GET['action'] == 'totalProductCount') {
        $result = $cart->getTotalProductCount($userID);
        echo json_encode($result);
    } else {
        // Existing logic to retrieve products in the cart
        $result = $cart->getProductsInCart($userID);
        echo json_encode($result);
    }
} else {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] . " is an invalid request method."]);
}

$mysqli->close();
?>
